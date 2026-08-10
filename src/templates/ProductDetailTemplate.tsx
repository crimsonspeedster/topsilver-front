"use client";

import BreadCrumb from "@src/commonsections/BreadCrumb";
import React, {useEffect, useState} from "react";
import {BreadcrumbsObject, ProductCardObject, ProductObject} from "@interfaces/entities/product";
import ViewedProductsSection from "@src/components/Product/Parts/ViewedProductsSection";
import {useTranslations} from "next-intl";
import {useRecentlyViewedStore} from "@src/store/recently-viewed-store";
import ProductTabs from "@src/components/Product/Parts/ProductTabs";
import {ReviewObject} from "@interfaces/entities/reviews";
import ProductTop from "@src/components/Product/Parts/ProductTop";
import Advantages from "@src/components/Blocks/Advantages";
import {LayoutBaseObject} from "@interfaces/entities/page";
import {AdvantagesLayoutObject} from "@interfaces/entities/blocks/advantages";
import axiosClient from "@lib/axiosClient";


type Props = {
    product: ProductObject,
    breadcrumbs: BreadcrumbsObject[],
    reviews: ReviewObject[],
    advantages?: (LayoutBaseObject & AdvantagesLayoutObject),
    prev_next: {
        prev: ProductCardObject|null,
        next: ProductCardObject|null,
    }
    size_guide: string|null,
    delivery_and_return: string|null,
}

const ProductDetailTemplate = (
    {
        product,
        breadcrumbs,
        prev_next,
        reviews,
        advantages,
        size_guide,
        delivery_and_return,
    }: Props
) => {
    useEffect(function () {
        console.log('PRODUCT - ', product);
    }, [product]);

    const t = useTranslations('Common');

    const [recentlyViewedProducts, setRecentlyViewedProducts] = useState<ProductCardObject[]>([]);

    const ids = useRecentlyViewedStore(
        state => state.ids
    );
    const addProduct = useRecentlyViewedStore(
        state => state.addProduct
    );

    const fetchRecentlyViewed = async () => {
        if (!ids.length) {
            setRecentlyViewedProducts([]);
            return;
        }

        try {
            const response = await axiosClient.get(
                '/products/batch',
                {
                    params: {
                        ids: ids.join(','),
                    },
                }
            );

            setRecentlyViewedProducts(response.data?.data ?? []);
        } catch (e) {

        }
    };

    useEffect(() => {
        addProduct(product.id);
    }, [product.id]);

    useEffect(() => {
        fetchRecentlyViewed();
    }, [ids]);

    return (
        <>
            <BreadCrumb
                breadcrumbs={breadcrumbs}
                prev_next={prev_next}
            />

            <ProductTop
                size_guide={size_guide}
                delivery_and_return={delivery_and_return}
                id={product.id}
                title={product.title}
                gallery={product.gallery}
                videos={product.videos}
                media={product.media}
                price_formatted={product.price_formatted}
                price_on_sale_formatted={product.price_on_sale_formatted}
                discount_percent={product.discount_percent}
                short_description={product.short_description}
                variant_attributes={product.variant_attributes}
                type={product.type}
                collections={product.collections}
                categories={product.categories}
                promotions={product.promotions}
                sku={product.sku}
                variants={product.variants}
                manage_stock={product.manage_stock}
                stock={product.stock}
                stock_status={product.stock_status}
                bundles={product.bundles}
            />

            <ProductTabs
                description={product.description}
                characteristics={''}
                guarantee={''}
                reviews={reviews}
                rating_count={product.rating_count}
                rating_avg={product.rating_avg}
                product_id={product.id}
                rating_distribution={product.rating_distribution}
            />

            <ViewedProductsSection
                title={t('buy_together')}
                products={product.cross_sells}
            />

            <ViewedProductsSection
                title={t('you_may_also_like')}
                products={product.group_products}
            />

            <ViewedProductsSection
                title={t('recently_viewed')}
                products={recentlyViewedProducts}
            />

            {
                advantages &&
                <Advantages
                    blocks={advantages.attributes.blocks}
                />
            }
        </>
    );
};

export default ProductDetailTemplate;