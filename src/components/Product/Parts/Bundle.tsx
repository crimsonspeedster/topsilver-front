'use client';

import {BundleObject} from "@interfaces/entities/product";
import React, {useState} from 'react';
import BundleItem from "@src/components/Product/Parts/BundleItem";
import {useTranslations} from "next-intl";
import {Form} from "react-bootstrap";
import BundleImageItem from "@src/components/Product/Parts/BundleImageItem";
import axiosClient from "@lib/axiosClient";
import {CartObject} from "@interfaces/entities/cart";
import {useCartStore} from "@src/store/cart-store";
import {toast} from "react-toastify";
import Link from "next/link";


type Props = {
    currentProductId: number;
    bundle: BundleObject;
};

const Bundle = (
    {
        bundle,
        currentProductId,
    }: Props
) => {
    const tProduct = useTranslations('Product');

    const hydrateCart = useCartStore((state) => state.hydrate);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('entity_type', 'bundle');
        formData.append('entity_id', bundle.id.toString());
        formData.append('quantity', '1');

        try {
            const response = await axiosClient.post<{
                data: CartObject,
            }>('/cart/items', formData);

            toast.success(
                <div>
                    {tProduct('added_to_cart')} {' '}

                    <Link
                        className="btn btn-primary"
                        href="/cart"
                    >{tProduct('go_to_cart')}</Link>
                </div>
            );

            hydrateCart(response.data.data);
        }
        catch(error: any) {
            if (error.response && error.response.status === 422) {
                const backendError = error.response.data.message;

                toast.error(backendError);
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="bundle">
            <h5 className="mb-4">{bundle.title}</h5>

            <Form
                onSubmit={
                    (e) => {
                        e.preventDefault();

                        handleSubmit();
                    }
                }
            >
                <div className="row align-items-center mb-5">
                    <div className="col-xl-6">
                        <ul className="list-unstyled m-0 p-0 d-flex flex-wrap align-items-center gap-2">
                            {
                                bundle.items.map((item, i) => {
                                    if (i < bundle.items.length-1) {
                                        return (
                                            <React.Fragment key={i}>
                                                <BundleImageItem
                                                    currentProductId={currentProductId}
                                                    item={item}
                                                />

                                                <li className="d-inline-block fs-4 text-muted">
                                                    +
                                                </li>
                                            </React.Fragment>
                                        )
                                    }

                                    return (
                                        <BundleImageItem
                                            key={i}
                                            currentProductId={currentProductId}
                                            item={item}
                                        />
                                    );
                                })
                            }
                        </ul>
                    </div>

                    <div className="col-xl-6 mt-4 mt-xl-0">
                        <p className="text-muted fs-18">
                            <span className="fs-14">{tProduct('bundle_price')}: </span>

                            <span>
                                <del>{bundle.old_price_formatted}</del> <span className="text-danger">{bundle.price_formatted}</span>
                            </span>
                        </p>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn btn-primary rounded-pill text-uppercase fw-semibold px-4"
                        >
                            {tProduct('add_bundle_to_cart')}
                        </button>
                    </div>
                </div>

                <ul className="list-unstyled m-0 p-0 vstack gap-3">
                    {
                        bundle.items.map(item => (
                            <BundleItem
                                key={item.id}
                                currentProductId={currentProductId}
                                item={item}
                            />
                        ))
                    }
                </ul>
            </Form>
        </div>
    );
}

export default Bundle;