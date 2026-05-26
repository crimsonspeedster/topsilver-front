"use client";

import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import {ProductCardObject, TaxonomiesCollectionObject} from "@interfaces/entities/product";
import {PriceObject, TaxonomyFiltersObject} from "@interfaces/entities/taxonomy";
import {attributeObject, attributeTermFunctionalityObject} from "@interfaces/entities/attribute";
import ProductBlock from "@src/components/Product/ProductBlock";
import TaxonomyFilters from "@src/components/Taxonomy/TaxonomyFilters";
import {useTranslations} from "next-intl";
import {SortObject} from "@interfaces/common";
import TaxonomySorting from "@src/components/Taxonomy/TaxonomySorting";


type Props = {
    products: ProductCardObject[],
    filters: TaxonomyFiltersObject,
    price: PriceObject,
    onTaxonomyChange: (
        type: string,
        taxonomy: TaxonomiesCollectionObject,
        checked: boolean,
    ) => void,
    onFilterChange: (
        attribute: attributeObject,
        term: attributeTermFunctionalityObject,
        checked: boolean,
    ) => void,
    sortItems: SortObject[],
    sortCurrent: SortObject,
    categories?: TaxonomiesCollectionObject[],
    collections?: TaxonomiesCollectionObject[],
    setSorting: (
        item: SortObject,
    ) => void,
    onPriceChange: (min: number, max: number) => void,
};

const FilterTab = (
    {
        products,
        filters,
        price,
        onFilterChange,
        sortItems,
        sortCurrent,
        setSorting,
        onPriceChange,
        onTaxonomyChange,
        collections,
        categories,
    } : Props) => {
    const t = useTranslations('Common');
    const [openFilter, setOpenFilter] = useState<boolean>(true);

    const handleFilterOpen = () => setOpenFilter(!openFilter);

    return (
        <section>
            <Container>
                <div className="mt-5 d-flex justify-content-between align-items-center">
                    <div className="text-muted fs-16 align-items-center d-none d-lg-flex cursor-pointer" id="filter-icon" onClick={handleFilterOpen}>
                        <i className={`iccl fwb iccl-filter fwb me-2 fw-medium ${!openFilter ? "d-none" : ""}`} id="icon-filter"></i>
                        <i className={`pe-7s-close pegk ${!openFilter ? "" : "d-none"} me-2 fw-medium fw-semibold`} id="icon-close" style={{ fontSize: "24px" }}></i>
                        <p className="mb-0">{t('filters')}</p>
                    </div>

                    <div className="d-flex align-items-center d-lg-none fs-16 text-muted cursor-pointer" data-bs-toggle="offcanvas">
                        <i className="iccl fwb iccl-filter fwb me-2 fw-medium" id="icon-filter"></i>
                        <i className="pe-7s-close pegk d-none me-2 fw-medium fw-semibold" id="icon-close" style={{ fontSize: "24px" }}></i>
                        <p className="mb-0">{t('filters')}</p>
                    </div>

                    <TaxonomySorting
                        items={sortItems}
                        current={sortCurrent}
                        handleSort={setSorting}
                    />
                </div>

                <TaxonomyFilters
                    filters={filters}
                    price={price}
                    open={openFilter}
                    onFilterChange={onFilterChange}
                    onPriceChange={onPriceChange}
                    categories={categories}
                    collections={collections}
                    onTaxonomyChange={onTaxonomyChange}
                />

                <div className="my-3 my-md-4">
                    {
                        products.length > 0 &&
                        <Row className="g-lg-4 g-3">
                            {
                                products.map(product => (
                                    <div className='col-6 col-lg-4 col-xl-3' key={product.id}>
                                        <ProductBlock
                                            key={product.id}
                                            product={product}
                                        />
                                    </div>
                                ))
                            }
                        </Row>
                    }

                    {
                        products.length === 0 &&
                        <p className="text-center">{t('no_products_found')}</p>
                    }
                </div>
            </Container>
        </section>
    )
}

export default FilterTab