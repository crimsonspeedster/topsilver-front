"use client";

import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {PriceObject, TaxonomyFiltersObject} from "@interfaces/entities/taxonomy";
import {attributeObject, attributeTermFunctionalityObject} from "@interfaces/entities/attribute";
import FilterColor from "@src/components/Taxonomy/Filters/FilterColor";
import FilterText from "@src/components/Taxonomy/Filters/FilterText";
import FilterPrice from "@src/components/Taxonomy/Filters/FilterPrice";
import {useTranslations} from "next-intl";
import {TaxonomiesCollectionObject} from "@interfaces/entities/product";
import FilterTaxonomy from "@src/components/Taxonomy/Filters/FilterTaxonomy";


type Props = {
    filters: TaxonomyFiltersObject,
    price: PriceObject,
    open: boolean,
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
    onPriceChange: (min: number, max: number) => void,
    categories?: TaxonomiesCollectionObject[],
    collections?: TaxonomiesCollectionObject[],
};

const TaxonomyFilters = (
    {
        filters,
        price,
        open,
        onFilterChange,
        onTaxonomyChange,
        onPriceChange,
        categories,
        collections,
    } : Props
) => {
    const t = useTranslations('Common');

    return (
        <div className={`p-4 filter-box ${!open ? "" : "d-none"} mt-4`}>
            <Row className="m-sm-2 g-4 g-sm-2">
                {
                    categories &&
                    <Col
                        sm={6}
                        lg={3}
                    >
                        <h5 className="mb-1 fw-medium">{t('by_categories')}:</h5>

                        <div className="filter-title" />

                        <div className="mt-3 filter__list">
                            {
                                categories.map(category => (
                                    <FilterTaxonomy
                                        key={category.id}
                                        type="categories"
                                        taxonomy={category}
                                        onTaxonomyChange={onTaxonomyChange}
                                    />
                                ))
                            }
                        </div>
                    </Col>
                }

                {
                    collections &&
                    <Col
                        sm={6}
                        lg={3}
                    >
                        <h5 className="mb-1 fw-medium">{t('by_collections')}:</h5>

                        <div className="filter-title" />

                        <div className="mt-3 filter__list">
                            {
                                collections.map(collection => (
                                    <FilterTaxonomy
                                        key={collection.id}
                                        type="collections"
                                        taxonomy={collection}
                                        onTaxonomyChange={onTaxonomyChange}
                                    />
                                ))
                            }
                        </div>
                    </Col>
                }

                {
                    filters.attributes.map(attribute =>
                        (
                            <Col
                                sm={6}
                                lg={3}
                                key={attribute.attribute.id}
                            >
                                <h5 className="mb-1 fw-medium">{t('by')} {attribute.attribute.title}:</h5>

                                <div className="filter-title" />

                                <div className="mt-3 filter__list">
                                    {
                                        attribute.terms.map(item => {
                                            if (attribute.attribute.type === "color") {
                                                return (
                                                    <FilterColor
                                                        key={item.id}
                                                        attribute={attribute.attribute}
                                                        term={item}
                                                        onFilterChange={onFilterChange}
                                                    />
                                                )
                                            }
                                            else {
                                                return (
                                                    <FilterText
                                                        key={item.id}
                                                        attribute={attribute.attribute}
                                                        term={item}
                                                        onFilterChange={onFilterChange}
                                                    />
                                                );
                                            }
                                        })
                                    }
                                </div>
                            </Col>
                        )
                    )
                }

                <div className="col-sm-6 col-lg-3">
                    <h5 className="mb-1 fw-medium">{t('by_price')}:</h5>

                    <div className="filter-title" />

                    <FilterPrice
                        initMax={filters.price.max}
                        initMin={filters.price.min}
                        min={price.min}
                        max={price.max}
                        onSubmit={onPriceChange}
                    />
                </div>
            </Row>
        </div>
    );
}

export default TaxonomyFilters;