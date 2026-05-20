import Image from "next/image";
import Link from "next/link";
import {CartItemProductObject} from "@interfaces/entities/cart";
import React, {useState} from "react";
import FallbackImage from "@assets/images/fallback.png";
import Quantity from "@src/components/Product/Forms/Quantity";
import CartItemRemove from "@src/components/Cart/CartItemRemove";
import axiosClient from "@lib/axiosClient";
import {useCartStore} from "@src/store/cart-store";
import {useTranslations} from "next-intl";
import {toast} from "react-toastify";


type Props = {
    item: CartItemProductObject,
    handleShoppingClose: ()=>void,
};

const MiniCartItemProduct = (
    {
        handleShoppingClose,
        item,
    }: Props
) => {
    const tCart = useTranslations('Cart');
    const setCart = useCartStore((state) => state.setCart);
    const maxQty = item.entity.manage_stock ?
        item.product_variant?.stock ?? item.entity.stock
        :
        99;

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(item.quantity);

    const handleQty = async (qty: number) => {
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axiosClient.patch(
                `/cart/items/${item.id}`,
                {
                    quantity: qty,
                }
            );

            setCart(response.data.data);

            setQuantity(qty);

            toast.success(tCart('amount_updated'));
        }
        catch (error: any) {
            if (error.response) {
                switch (error.response.status) {
                    case 422:
                        toast.error(error.response.data.message);
                        break;
                    default:
                        break;
                }
            }
            else {
                console.error('Unexpected error:', error);
            }
        }
        finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="p-20 border-top">
            <div className="row">
                <div className="col-5">
                    <Link
                        className=""
                        href={`/${item.entity.slug}`}
                        onNavigate={handleShoppingClose}
                    >
                        <Image
                            src={item.entity.media?.url ?? FallbackImage}
                            width={110}
                            height={137}
                            alt={item.entity.title}
                            className="object-fit-cover object-center"
                        />
                    </Link>
                </div>

                <div className="col-7">
                    <h6 className="mb-1">
                        <Link
                            href={`/${item.entity.slug}`}
                            className="product-title"
                            onNavigate={handleShoppingClose}
                        >
                            {item.entity.title}
                        </Link>
                    </h6>

                    {
                        item.product_variant &&
                        <p className="text-muted fs-12">
                            {
                                item.product_variant.attribute_terms && item.product_variant.attribute_terms.length > 0 &&
                                item.product_variant.attribute_terms.map((attr, i) => (
                                    <span
                                        key={attr.id}
                                    >
                                        {
                                            attr.title
                                        }
                                        {
                                            ' '
                                        }
                                    </span>
                                ))
                            }
                        </p>
                    }

                    <p className="fs-14 text-muted d-flex align-items-center gap-2">
                        <span>{item.price_formatted}</span>
                    </p>

                    <div className="">
                        <Quantity
                            value={quantity}
                            onChange={handleQty}
                            max={maxQty}
                        />
                    </div>

                    <div className="d-flex align-items-center gap-3 mt-2">
                        <CartItemRemove
                            id={item.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiniCartItemProduct;