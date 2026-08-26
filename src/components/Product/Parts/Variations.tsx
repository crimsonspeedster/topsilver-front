"use client";

import {VariantAttributeObject} from "@interfaces/entities/product";
import VariationTerm from "@src/components/Product/Parts/VariationTerm";
import {useEffect, useState} from "react";


type Props = {
    variant_attributes: VariantAttributeObject[],
    isTermsCentered?: boolean,
    selected: Record<number, number>;
    onSelect: (
        attributeId: number,
        termId: number
    ) => void;
    checkIsTermAvailable: (
        attributeId: number,
        termId: number
    ) => boolean;
};

const Variations = (
    {
        variant_attributes,
        isTermsCentered,
        selected,
        onSelect,
        checkIsTermAvailable,
    }: Props
) => {
    const getSelectedTermTitle = (item: VariantAttributeObject): string => {
        const term = item.terms.find(
            (t) => t.id === selected[item.attribute.id]
        );

        return term?.title ?? "";
    };

    return (
        <div className="mb-4 pt-2">
            {
                variant_attributes.map((item) => (
                    <div
                        key={item.attribute.id}
                        className="mb-4 pt-2"
                    >
                        <h6 className="text-uppercase fw-bold mb-3">
                            {item.attribute.title}:

                            <span> {getSelectedTermTitle(item)}</span>
                        </h6>

                        <div className={`product-color-list size mt-2 gap-2 d-flex align-items-center flex-wrap ${isTermsCentered ? "justify-content-center" : ""}`}>
                            {
                                item.terms.map((term) => (
                                    <VariationTerm
                                        key={term.id}
                                        term={term}
                                        handleClick={(termId) =>
                                            onSelect(item.attribute.id, termId)
                                        }
                                        isAvailable={
                                            checkIsTermAvailable(item.attribute.id, term.id)
                                        }
                                        isActive={selected[item.attribute.id] === term.id}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Variations;