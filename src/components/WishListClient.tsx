'use client';

import {useWishlistStore} from "@src/store/wishlist-store";
import {useTranslations} from "next-intl";
import React, {useEffect, useState} from "react";
import {ProductCardObject} from "@interfaces/entities/product";
import {Row} from "react-bootstrap";
import ProductBlock from "@src/components/Product/ProductBlock";
import axiosClient from "@lib/axiosClient";


const WishListClient = () => {
    const tWishList = useTranslations('Wishlist');
    const tCommon = useTranslations('Common');
    const wishList = useWishlistStore(state => state.wishlist);

    const [products, setProducts] = useState<ProductCardObject[]>([]);

    useEffect(() => {
        if (wishList.length > 0) {
            try {
                axiosClient.get('/products/batch', {
                    params: {
                        ids: wishList
                    }
                })
                    .then((res) => {
                        setProducts(res.data.data);
                    });
            }
            catch (error) {

            }
        }
        else {
            setProducts([]);
        }
    }, [wishList]);

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="text-center">{tWishList('wishlist')}</h1>

                {
                    products.length > 0 &&
                    <Row className="g-lg-4 g-3">
                        {
                            products.map(product => (
                                <div className='col-6 col-lg-4 col-xl-3' key={product.id}>
                                    <ProductBlock
                                        key={product.id}
                                        product={product}
                                    />
                                </div>
                            ))
                        }
                    </Row>
                }

                {
                    products.length === 0 &&
                    <p className="text-center">{tCommon('no_products_found')}</p>
                }
            </div>
        </section>
    );
}

export default WishListClient;