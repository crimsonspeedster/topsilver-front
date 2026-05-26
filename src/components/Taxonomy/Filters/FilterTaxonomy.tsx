"use client";

import React from "react";
import {attributeObject, attributeTermFunctionalityObject} from "@interfaces/entities/attribute";
import {TaxonomiesCollectionObject} from "@interfaces/entities/product";


type Props = {
    taxonomy: TaxonomiesCollectionObject;
    type: string;
    onTaxonomyChange: (
        type: string,
        taxonomy: TaxonomiesCollectionObject,
        checked: boolean,
    ) => void,
};

const FilterTaxonomy = (
    {
        type,
        taxonomy,
        onTaxonomyChange,
    }: Props
) => {
    return (
        <div className="form-check mb-2">
            <input
                className="form-check-input"
                type="checkbox"
                id={`${type}-${taxonomy.id}`}
                defaultChecked={taxonomy.selected}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onTaxonomyChange(
                        type,
                        taxonomy,
                        e.target.checked,
                    );
                }}
            />

            <label
                className="form-check-label cursor-pointer"
                htmlFor={`${type}-${taxonomy.id}`}
            >
                {taxonomy.title}
            </label>
        </div>
    );
}

export default FilterTaxonomy;