'use client';

import {BundleItemObject} from "@interfaces/entities/product";
import Link from "next/link";
import React from "react";
import {useTranslations} from "next-intl";

type Props = {
    currentProductId: number;
    item: BundleItemObject;
};

const BundleItem = (
    {
        currentProductId,
        item,
    }: Props
) => {
    const tProduct = useTranslations('Product');

    return (
        <li className="d-flex flex-wrap align-items-center">
            {
                currentProductId === item.product.id ?
                    <span className="text-muted">
                        <strong>{tProduct('current_bundle_product')}: </strong>

                        {item.product.title}
                    </span>
                    :
                    <Link
                        href={`/${item.product.slug}`}
                    >
                        {item.product.title}
                    </Link>
            }

            <span> x <strong>{item.quantity}</strong></span>
        </li>
    );
}

export default BundleItem;