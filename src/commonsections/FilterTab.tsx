"use client";

import React, { useState } from 'react';
import AddToCardModal from '@src/commonsections/AddToCardModal';
import { Container, Row } from 'react-bootstrap';
import ProductModal from './ProductModal';
import {ProductCardObject, ProductQuickShopObject, ProductQuickViewObject} from "@interfaces/entities/product";
import {PriceObject, TaxonomyFiltersObject} from "@interfaces/entities/taxonomy";
import {attributeObject, attributeTermFunctionalityObject} from "@interfaces/entities/attribute";
import ProductBlock from "@src/components/Product/ProductBlock";
import TaxonomyFilters from "@src/components/Taxonomy/TaxonomyFilters";
import {useTranslations} from "next-intl";
import {SortObject} from "@interfaces/common";
import TaxonomySorting from "@src/components/Taxonomy/TaxonomySorting";
import axios from "axios";


type Props = {
    products: ProductCardObject[],
    filters: TaxonomyFiltersObject,
    price: PriceObject,
    onFilterChange: (
        attribute: attributeObject,
        term: attributeTermFunctionalityObject,
        checked: boolean,
    ) => void,
    sortItems: SortObject[],
    sortCurrent: SortObject,
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
    } : Props) => {
    const t = useTranslations('Common');
    const [openFilter, setOpenFilter] = useState<boolean>(true);
    const [quickView, setQuickView] = useState<boolean>(false);
    const [quickShop, setQuickShop] = useState<boolean>(false);
    const [selectedProductQuickShop, setSelectedProductQuickShop] = useState<ProductQuickShopObject|null>(null);
    const [selectedProductQuickView, setSelectedProductQuickShow] = useState<ProductQuickViewObject|null>(null);

    const handleFilterOpen = () => setOpenFilter(!openFilter);
    const handleQuickModal = async (
        id: number,
        type: string,
    ) => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/products/${id}`,
            {
                params: {
                    type
                },
            }
        );

        if (type === 'quick_view') {
            setSelectedProductQuickShow(response.data?.data ?? null);
            setQuickView(true);
        }
        else {
            setSelectedProductQuickShop(response.data?.data ?? null);
            setQuickShop(true);
        }
    }
    const handleQuickModalClose = (
        type: string,
    ) => {
        if (type === 'quick_view') {
            setQuickView(false);
            setSelectedProductQuickShow(null);
        }
        else {
            setQuickShop(false);
            setSelectedProductQuickShop(null);
        }
    };

    return (
        <React.Fragment>
            <Container>
                <div className="mt-5 d-flex justify-content-between align-items-center">
                    <div className="text-muted fs-16 align-items-center d-none d-lg-flex cursor-pointer" id="filter-icon" onClick={handleFilterOpen}>
                        <i className={`iccl fwb iccl-filter fwb me-2 fw-medium ${!open ? "d-none" : ""}`} id="icon-filter"></i>
                        <i className={`pe-7s-close pegk ${!open ? "" : "d-none"} me-2 fw-medium fw-semibold`} id="icon-close" style={{ fontSize: "24px" }}></i>
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
                                            handleQuickModal={handleQuickModal}
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

            <ProductModal
                cardShow={quickView}
                handleClose={handleQuickModalClose}
                product={selectedProductQuickView}
            />

            <AddToCardModal
                cardShow={quickShop}
                handleAddToCardModalClose={handleQuickModalClose}
                product={selectedProductQuickShop}
            />
        </React.Fragment>
    )
}

export default FilterTab