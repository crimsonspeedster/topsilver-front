"use client";

import React from "react";
import {attributeObject, attributeTermFunctionalityObject} from "@interfaces/entities/attribute";


type Props = {
    attribute: attributeObject,
    term: attributeTermFunctionalityObject,
    onFilterChange: (
        attribute: attributeObject,
        term: attributeTermFunctionalityObject,
        checked: boolean,
    ) => void,
};

const FilterColor = (
    {
        attribute,
        term,
        onFilterChange,
    }: Props
) => {
    return (
        <div className="round d-flex align-items-center pt-2 mb-2 gap-1">
            <input
                className="form-check-input"
                type="checkbox"
                id={term.slug}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onFilterChange(
                        attribute,
                        term,
                        e.target.checked,
                    );
                }}
                defaultChecked={term.selected}
                style={
                    term.meta_value ?
                        {
                            backgroundColor: term.meta_value,
                        }
                        :
                        undefined
                }
            />

            <label
                className="form-check-label ms-1 cursor-pointer"
                htmlFor={term.slug}
            >
                {term.title} ({term.count})
            </label>
        </div>
    );
}

export default FilterColor;