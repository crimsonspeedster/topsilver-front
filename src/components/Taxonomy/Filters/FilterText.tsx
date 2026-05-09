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

const FilterText = (
    {
        attribute,
        term,
        onFilterChange,
    }: Props
) => {
    return (
        <div className="form-check mb-2">
            <input
                className="form-check-input"
                type="checkbox"
                id={term.slug}
                defaultChecked={term.selected}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onFilterChange(
                        attribute,
                        term,
                        e.target.checked,
                    );
                }}
            />

            <label
                className="form-check-label cursor-pointer"
                htmlFor={term.slug}
            >
                {term.title} ({term.count})
            </label>
        </div>
    );
}

export default FilterText;