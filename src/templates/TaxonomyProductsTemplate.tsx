"use client";

import Header from "@src/components/Headers/Header";
import FooterPage from "@src/components/Footer";
import WomenColting from "@src/commonsections/WomenCloting";
import FilterTab from "@src/commonsections/FilterTab";
import {ProductCardObject} from "@interfaces/entities/product";
import {PaginationObject} from "@interfaces/common";
import PaginationComponent from "@src/components/PaginationComponent";
import {PriceObject, TaxonomyFiltersObject, TaxonomyObject} from "@interfaces/entities/taxonomy";
import LoadMoreButton from "@src/commonsections/LoadMoreButton";
import {useTaxonomyProducts} from "@hooks/useTaxonomyProducts";
import ProductPopups from "@src/components/Product/ProductPopups";


export type TaxonomyProductsTemplateProps = {
    type: string,
    slug: string,
    entity: TaxonomyObject,
    initialProducts: ProductCardObject[],
    initialPagination: PaginationObject,
    initialFilters: TaxonomyFiltersObject,
    initialPrice: PriceObject,
    initialPage: number,
    initialSort: string,
};

const TaxonomyProductsTemplate = (props: TaxonomyProductsTemplateProps) => {
    const taxonomy = useTaxonomyProducts(props);

    return (
        <>
            <Header />

            <main>
                <WomenColting
                    title={props.entity.title}
                    description={props.entity.description}
                    media={props.entity.media}
                />

                <FilterTab
                    products={taxonomy.products}
                    filters={taxonomy.filters}
                    price={taxonomy.price}
                    onFilterChange={taxonomy.handleFilterChange}
                    sortItems={taxonomy.sortItems}
                    sortCurrent={taxonomy.sorting}
                    setSorting={taxonomy.handleSortChange}
                    onPriceChange={taxonomy.handlePriceFilter}
                />

                <LoadMoreButton
                    hasMore={taxonomy.hasMore}
                    isLoading={taxonomy.loading}
                    onLoadMore={taxonomy.handleLoadMore}
                />

                <PaginationComponent
                    pagination={taxonomy.pagination}
                    slug={props.slug}
                    current_page={props.initialPage}
                />
            </main>

            <ProductPopups />

            <FooterPage />
        </>
    );
};

export default TaxonomyProductsTemplate;