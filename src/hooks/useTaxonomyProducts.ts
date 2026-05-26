"use client";

import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import axios from "axios";
import {ProductCardObject, TaxonomiesCollectionObject} from "@interfaces/entities/product";
import {PaginationObject, SortObject} from "@interfaces/common";
import {PriceObject, TaxonomyFiltersObject} from "@interfaces/entities/taxonomy";
import {buildTaxonomyPageUrl, buildTaxonomyProductsUrl} from "@services/taxonomy/taxonomy.utils";
import {attributeObject, attributeTermFunctionalityObject} from "@interfaces/entities/attribute";
import {buildTaxonomyQueryParams} from "@services/taxonomy/taxonomy-query.utils";
import {TaxonomyProductsTemplateProps} from "@templates/TaxonomyProductsTemplate";
import {useTranslations} from "next-intl";

export const useTaxonomyProducts = (
    {
        initialProducts,
        initialPagination,
        initialFilters,
        initialPage,
        initialPrice,
        initialSort,
        urlForRest,
        slug,
        initialCategories,
        initialCollections,
    }: TaxonomyProductsTemplateProps) => {
    const t = useTranslations('Sorting');
    const router = useRouter();
    const searchParams = useSearchParams();
    const sortItems: SortObject[] = [
        {
            slug: "newest",
            name: t("newest"),
        },
        {
            slug: "oldest",
            name: t("oldest"),
        },
        {
            slug: "price_asc",
            name: t("price_asc"),
        },
        {
            slug: "price_desc",
            name: t("price_desc"),
        },
        {
            slug: "selling",
            name: t("selling"),
        },
    ];
    const initialSortItem: SortObject = sortItems.find(item => item.slug === initialSort) ?? sortItems[0];

    const [products, setProducts] = useState<ProductCardObject[]>(initialProducts);
    const [page, setPage] = useState<number>(initialPage);
    const [hasMore, setHasMore] = useState<boolean>(initialPagination.has_more_pages);
    const [loading, setLoading] = useState<boolean>(false);
    const [filters, setFilters] = useState<TaxonomyFiltersObject>(initialFilters);
    const [categories, setCategories] = useState<TaxonomiesCollectionObject[]>(initialCategories ?? []);
    const [collections, setCollections] = useState<TaxonomiesCollectionObject[]>(initialCollections ?? []);
    const [pagination, setPagination] = useState<PaginationObject>(initialPagination);
    const [sorting, setSorting] = useState<SortObject>(initialSortItem);
    const [price, setPrice] = useState<PriceObject>(initialPrice);

    const fetchProducts = async (params?: URLSearchParams) => {
        const response = await axios.get(urlForRest, {
            params,
        });

        return response.data?.data;
    };

    const handlePriceFilter = async (
        min: number,
        max: number,
    ) => {
        if (loading) {
            return;
        }

        try {
            setLoading(true);

            const params = new URLSearchParams(
                searchParams.toString(),
            );

            params.set("price[min]", String(min));
            params.set("price[max]", String(max));

            params.delete("page");

            router.replace(
                buildTaxonomyPageUrl(
                    slug,
                    1,
                    params,
                )
            );

            const data = await fetchProducts(params);

            if (!data) {
                return;
            }

            setProducts(data.products);
            setPagination(data.pagination);
            setHasMore(data.pagination.has_more_pages);
            setFilters(data.filters);
            setPage(1);
            setPrice({
                min,
                max
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSortChange = async (
        item: SortObject
    ) => {
        if (loading) {
            return;
        }

        try {
            setLoading(true);

            const params = buildTaxonomyQueryParams(
                filters,
                item,
                searchParams,
                price,
            );

            router.replace(
                buildTaxonomyPageUrl(
                    slug,
                    1,
                    params,
                )
            );

            const data = await fetchProducts(params);

            if (!data) {
                return;
            }

            setProducts(data.products);
            setPagination(data.pagination);
            setHasMore(data.pagination.has_more_pages);
            setSorting(item);
            setPage(1);
        } finally {
            setLoading(false);
        }
    };

    const handleTaxonomyChange = async (
        type: string,
        taxonomy: TaxonomiesCollectionObject,
        checked: boolean,
    ) => {
        if (loading) {
            return;
        }

        let taxonomiesUpdated: TaxonomiesCollectionObject[] = [];

        switch (type) {
            case 'categories':
                taxonomiesUpdated = categories.map(item => {
                    if (item.id === taxonomy.id) {
                        item.selected = checked;
                    }

                    return item;
                });
                setCategories(taxonomiesUpdated);
                break;
            case 'collections':
                taxonomiesUpdated = collections.map(item => {
                    if (item.id === taxonomy.id) {
                        item.selected = checked;
                    }

                    return item;
                });
                setCollections(taxonomiesUpdated);
                break;
            default:
                break;
        }

        try {
            setLoading(true);

            const params = buildTaxonomyQueryParams(
                filters,
                sorting,
                searchParams,
                price,
                categories,
                collections,
            );

            router.replace(
                buildTaxonomyPageUrl(
                    slug,
                    1,
                    params,
                )
            );

            const data = await fetchProducts(params);

            if (!data) {
                return;
            }

            setProducts(data.products);
            setPagination(data.pagination);
            setHasMore(data.pagination.has_more_pages);
            setPage(1);
        } finally {
            setLoading(false);
        }
    }

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

            const params = buildTaxonomyQueryParams(
                updatedFilters,
                sorting,
                searchParams,
                price,
            );

            router.replace(
                buildTaxonomyPageUrl(
                    slug,
                    1,
                    params,
                )
            );

            const data = await fetchProducts(params);

            if (!data) {
                return;
            }

            setProducts(data.products);
            setPagination(data.pagination);
            setHasMore(data.pagination.has_more_pages);
            setPage(1);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = async () => {
        if (loading || !hasMore) {
            return;
        }

        try {
            setLoading(true);

            const params = new URLSearchParams(searchParams.toString());
            params.set("page", String(page + 1));

            const data = await fetchProducts(params);

            if (!data) {
                return;
            }

            setProducts(prev => [
                ...prev,
                ...data.products,
            ]);
            setPage(prev => prev+1);
            setPagination(data.pagination);
            setHasMore(data.pagination.has_more_pages);
        } finally {
            setLoading(false);
        }
    };

    return {
        products,
        page,
        hasMore,
        loading,
        filters,
        pagination,
        sortItems,
        sorting,
        price,

        handleFilterChange,
        handleTaxonomyChange,
        handleLoadMore,
        handleSortChange,
        handlePriceFilter,
    };
};