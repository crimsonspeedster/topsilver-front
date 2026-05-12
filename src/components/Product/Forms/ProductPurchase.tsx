"use client";

import Quantity from "@src/components/Product/Forms/Quantity";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {ProductObject} from "@interfaces/entities/product";
import WishListButton from "@src/components/Product/Parts/WishListButton";
import {ProductTopProps} from "@interfaces/layouts/product";


type Props = Pick<
    ProductTopProps,
    | 'id'
    | 'variant_attributes'
>;

const ProductPurchase = (
    {
        id,
    }: Props
) => {
    const tProduct = useTranslations('Product');

    const [quantity, setQuantity] = useState<number>(1);

    return (
        <>
            <Quantity
                value={quantity}
                onChange={setQuantity}
            />

            <button
                className="text-uppercase rounded-pill min-w-150"
            >
                {tProduct('add_to_cart')}
            </button>

            <WishListButton
                id={id}
                parentClasses="product_wishlist square-40 rounded-circle border border-dark bg-transparent text-center leading-40"
            />
        </>
    );
}

export default ProductPurchase;