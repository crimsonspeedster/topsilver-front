"use client";

import HeadTitle from "@src/commonsections/HeadTitle";
import Header from "@src/components/Headers/Header";
import FooterPage from "@src/components/Footer";
import React from "react";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import ShopNavbar from "@src/commonsections/ShopNavbar";
import WomenColting from "@src/commonsections/WomenCloting";
import FilterTab from "@src/commonsections/FilterTab";
import {ProductCardObject} from "@interfaces/entities/product";
import {PaginationObject} from "@interfaces/common";
import PaginationComponent from "@src/components/PaginationComponent";
import {TaxonomyFiltersObject, TaxonomyObject} from "@interfaces/entities/taxonomy";
import LoadMoreButton from "@src/commonsections/LoadMoreButton";
import axios from "axios";
import {attributeObject, attributeTermFunctionalityObject} from "@interfaces/entities/attribute";

const CategoryTemplate = ({
    initialProducts,
    initialPagination,
    entity,
    initialFilters,
    slug,
    initialPage,
}: {
    entity: TaxonomyObject,
    initialFilters: TaxonomyFiltersObject,
    initialProducts: ProductCardObject[],
    initialPagination: PaginationObject
    slug: string,
    initialPage: number,
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [products, setProducts] = React.useState<ProductCardObject[]>(initialProducts);
    const [page, setPage] = React.useState<number>(initialPage);
    const [hasMore, setHasMore] = React.useState<boolean>(initialPagination.has_more_pages);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [filters, setFilters] = React.useState<TaxonomyFiltersObject>(initialFilters);
    const [pagination, setPagination] = React.useState<PaginationObject>(initialPagination);

    const handleFilterChange = async (
        attribute: attributeObject,
        term: attributeTermFunctionalityObject,
        checked: boolean,
    ) => {
        if (loading) {
            return;
        }

        const updatedFilters: TaxonomyFiltersObject = {
            ...filters,
            attributes: filters.attributes.map(item => {
                if (item.attribute.id !== attribute.id) {
                    return item;
                }

                return {
                    ...item,
                    terms: item.terms.map(attributeTerm => {
                        if (attributeTerm.id !== term.id) {
                            return attributeTerm;
                        }

                        return {
                            ...attributeTerm,
                            selected: checked,
                        };
                    }),
                };
            }),
        };

        setFilters(updatedFilters);

        try {
            setLoading(true);

            const params = new URLSearchParams(searchParams.toString());

            updatedFilters.attributes.forEach(item => {
                const selectedTerms = item.terms
                    .filter(term => term.selected)
                    .map(term => term.id);

                const key = `filters[${item.attribute.id}]`;

                if (selectedTerms.length) {
                    params.set(key, selectedTerms.join(','));
                } else {
                    params.delete(key);
                }
            });

            router.push(`${pathname}?${params.toString()}`);

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/taxonomies/category/${entity.id}/products`,
                {
                    params,
                }
            );

            const data = response.data?.data;

            if (!data) {
                return;
            }

            setPagination(data.pagination);
            setProducts(data.products);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        if (loading) {
            return;
        }

        try {
            setLoading(true);

            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/taxonomies/category/${entity.id}/products`,
                {
                    params: {
                        page: page + 1,
                    },
                }
            );

            const data = response.data?.data;

            if (!data) {
                return;
            }

            setProducts(prev => [
                ...prev,
                ...data.products,
            ]);

            setHasMore(data.pagination.has_more_pages);
            setPagination(data.pagination);

            setPage(prev => prev + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />

            <main>
                <WomenColting
                    title={entity.title}
                    description={entity.description}
                    image={entity.media?.url}
                />

                <FilterTab
                    products={products}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                <LoadMoreButton
                    hasMore={hasMore}
                    isLoading={loading}
                    onLoadMore={handleLoadMore}
                />

                <PaginationComponent
                    pagination={pagination}
                    slug={slug}
                    current_page={page}
                />
            </main>

            <FooterPage />
        </>
    );
};

export default CategoryTemplate;