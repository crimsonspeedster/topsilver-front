'use client';

import {useTranslations} from "next-intl";
import CheckoutOverhead from "@src/components/Checkout/CheckoutOverhead";
import React, {useState} from "react";
import {ShippingMethodObject} from "@interfaces/entities/shipping-method";
import {useFormikContext} from "formik";
import {CheckoutFormValues} from "@interfaces/layouts/checkoutForm";
import Accordion from "react-bootstrap/esm/Accordion";
import ShippingMethodItem from "@src/components/Checkout/Shipping/ShippingMethodItem";


type Props = {
    methods: ShippingMethodObject[],
};

const ShippingInfo = (
    {
        methods,
    }: Props
) => {
    const tCheckout = useTranslations('Checkout');
    const { values, setFieldValue } = useFormikContext<CheckoutFormValues>();
    const selected = values.shipping_method;

    const [shippingType, setShippingType] = useState<string>(selected?.type ?? '');

    const handleShippingMethod = (method: ShippingMethodObject) => {
        setFieldValue("shipping_method", method);

        setShippingType(method.type);
    }

    return (
        <div>
            <CheckoutOverhead
                num={2}
                title={tCheckout('shipping_overhead')}
            />

            {
                methods.length > 0 ?
                    <div>
                        <div>
                            {
                                methods.map(method => (
                                    <div
                                        className="d-flex align-items-center w-100 cursor-pointer"
                                        key={method.id}
                                        onClick={() => {
                                            handleShippingMethod(method);
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="shipping_method_id"
                                            checked={selected?.id === method.id}
                                            className="input-radio me-2"
                                        />

                                        {method.name}
                                    </div>
                                ))
                            }
                        </div>

                        <div className="mt-3">
                            <ShippingMethodItem
                                type={shippingType}
                            />
                        </div>
                    </div>
                    :
                    <p>{tCheckout('shipping_methods_not_found')}</p>
            }
        </div>
    );
}

export default ShippingInfo;