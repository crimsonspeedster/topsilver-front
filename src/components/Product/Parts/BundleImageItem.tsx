import {BundleItemObject} from "@interfaces/entities/product";
import Link from "next/link";
import Image from "next/image";
import FallbackImage from "@assets/images/fallback.png";
import React from "react";


type Props = {
    currentProductId: number;
    item: BundleItemObject;
};

const BundleImageItem = (
    {
        item,
        currentProductId,
    }: Props
) => {
    if (currentProductId === item.product.id) {
        return (
            <li className="d-inline-block">
                <div>
                    <Image
                        src={item.product.media?.url ?? FallbackImage}
                        alt={item.product.title}
                        width={115}
                        height={147}
                        className="object-fit-cover object-center"
                    />
                </div>
            </li>
        );
    }

    return (
        <li className="d-inline-block">
            <Link
                href={`/${item.product.slug}`}
            >
                <Image
                    src={item.product.media?.url ?? FallbackImage}
                    alt={item.product.title}
                    width={115}
                    height={147}
                    className="object-fit-cover object-center"
                />
            </Link>
        </li>
    );
};

export default BundleImageItem;