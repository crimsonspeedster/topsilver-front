"use client";

import React from 'react';
import { Col, Row } from 'react-bootstrap';
import {PriceObject, TaxonomyFiltersObject} from "@interfaces/entities/taxonomy";
import {attributeObject, attributeTermFunctionalityObject} from "@interfaces/entities/attribute";
import FilterColor from "@src/components/Taxonomy/Filters/FilterColor";
import FilterText from "@src/components/Taxonomy/Filters/FilterText";
import FilterPrice from "@src/components/Taxonomy/Filters/FilterPrice";
import {useTranslations} from "next-intl";


type Props = {
    filters: TaxonomyFiltersObject,
    price: PriceObject,
    open: boolean,
    onFilterChange: (
        attribute: attributeObject,
        term: attributeTermFunctionalityObject,
        checked: boolean,
    ) => void,
    onPriceChange: (min: number, max: number) => void,
};

const TaxonomyFilters = (
    {
        filters,
        price,
        open,
        onFilterChange,
        onPriceChange,
    } : Props
) => {
    const t = useTranslations('Common');

    return (
        <div className={`p-4 filter-box ${!open ? "" : "d-none"} mt-4`}>
            <Row className="m-sm-2 g-4 g-sm-2">
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

                                <div className="mt-3">
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