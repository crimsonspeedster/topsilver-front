"use client";

import {VariantAttributeObject} from "@interfaces/entities/product";
import VariationTerm from "@src/components/Product/Parts/VariationTerm";
import {useEffect, useState} from "react";


type Props = {
    variants: VariantAttributeObject[],
    isTermsCentered?: boolean,
    selected: Record<number, number>;
    onSelect: (
        attributeId: number,
        termId: number
    ) => void;
};

const Variations = (
    {
        variants,
        isTermsCentered,
        selected,
        onSelect,
    }: Props
) => {
    const getSelectedTermTitle = (variant: VariantAttributeObject): string => {
        const term = variant.terms.find(
            (t) => t.id === selected[variant.attribute.id]
        );

        return term?.title ?? "";
    };

    useEffect(function () {
        console.log('Variants - ', variants);
    }, [variants]);

    return (
        <div className="mb-4 pt-2">
            {
                variants.map((variant) => (
                    <div
                        key={variant.attribute.id}
                        className="mb-4 pt-2"
                    >
                        <h6 className="text-uppercase fw-bold mb-3">
                            {variant.attribute.title}:

                            <span> {getSelectedTermTitle(variant)}</span>
                        </h6>

                        <div className={`product-color-list size mt-2 gap-2 d-flex align-items-center flex-wrap ${isTermsCentered ? "justify-content-center" : ""}`}>
                            {
                                variant.terms.map((term) => (
                                    <VariationTerm
                                        key={term.id}
                                        term={term}
                                        handleClick={(termId) =>
                                            onSelect(variant.attribute.id, termId)
                                        }
                                        isActive={selected[variant.attribute.id] === term.id}
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