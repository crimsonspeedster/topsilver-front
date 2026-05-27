import Variations from "@src/components/Product/Parts/Variations";
import WishListButton from "@src/components/Product/Parts/WishListButton";
import ButtonWithPopup from "@src/components/Product/Parts/ButtonWithPopup";
import ProductInfo from "@src/components/Product/Parts/ProductInfo";
import {ProductObject} from "@interfaces/entities/product";
import ProductPrices from "@src/components/Product/Parts/ProductPrices";
import {useTranslations} from "next-intl";
import ProductTopHeader from "@src/components/Product/Parts/ProductTopHeader";
import ProductPurchase from "@src/components/Product/Forms/ProductPurchase";
import {ProductTopInfoProps} from "@interfaces/layouts/product";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import NotifyMe from "@src/components/Product/NotifyMe";


const ProductTopInfo = (
    props: ProductTopInfoProps
) => {
    const tProduct = useTranslations('Product');

    const [formatedPrice, setFormatedPrice] = useState<string>(props.price_formatted);
    const [formatedOnSalePrice, setFormatedOnSalePrice] = useState<string|null>(props.price_on_sale_formatted);
    const [discountPercentage, setDiscountPercentage] = useState<number|null>(props.discount_percent);

    const priceHandle = (price: string, price_on_sale: string|null, discount_percent: number|null) => {
        setFormatedPrice(price);
        setFormatedOnSalePrice(price_on_sale);
        setDiscountPercentage(discount_percent);
    }

    return (
        <>
            <ProductTopHeader
                title={props.title}
                price_formatted={formatedPrice}
                price_on_sale_formatted={formatedOnSalePrice}
                discount_percent={discountPercentage}
                short_description={props.short_description}
            />

            {
                props.stock_status === 'in_stock' ?
                    <ProductPurchase
                        id={props.id}
                        manage_stock={props.manage_stock}
                        stock={props.stock}
                        type={props.type}
                        stock_status={props.stock_status}
                        variants={props.variants}
                        variant_attributes={props.variant_attributes}
                        priceHandle={priceHandle}
                        price_formatted={props.price_formatted}
                        price_on_sale_formatted={props.price_on_sale_formatted}
                        discount_percent={props.discount_percent}
                    />
                    :
                    <NotifyMe
                        product_id={props.id}
                    />
            }

            {
                (props.size_guide || props.delivery_and_return) &&
                <div className="mt-4 d-flex gap-3 text-nowrap flex-wrap row-gap-1">
                    {
                        props.size_guide &&
                        <ButtonWithPopup
                            title={tProduct('size_guid')}
                            content={props.size_guide}
                        />
                    }

                    {
                        props.delivery_and_return &&
                        <ButtonWithPopup
                            title={tProduct('delivery_and_return')}
                            content={props.delivery_and_return}
                        />
                    }
                </div>
            }

            <ProductInfo
                collections={props.collections}
                categories={props.categories}
                promotions={props.promotions}
                sku={props.sku}
            />
        </>
    );
}

export default ProductTopInfo;