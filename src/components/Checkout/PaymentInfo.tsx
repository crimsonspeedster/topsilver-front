'use client';

import {useTranslations} from "next-intl";
import CheckoutOverhead from "@src/components/Checkout/CheckoutOverhead";
import React from "react";
import {PaymentMethodObject} from "@interfaces/entities/payment-method";
import Accordion from 'react-bootstrap/Accordion';
import {useFormikContext} from "formik";
import {CheckoutFormValues} from "@interfaces/layouts/checkoutForm";


type Props = {
    methods: PaymentMethodObject[],
}

const PaymentInfo = (
    {
        methods,
    }: Props
) => {
    const tCheckout = useTranslations('Checkout');
    const { values, setFieldValue } = useFormikContext<CheckoutFormValues>();
    const selected = values.payment_method;

    return (
        <div className="mt-3">
            <CheckoutOverhead
                num={3}
                title={tCheckout('payment_overhead')}
            />

            {
                methods.length > 0 ?
                    <Accordion
                        defaultActiveKey={selected?.id?.toString() || methods[0].id.toString()}
                        onSelect={(key) => {
                            if (key) {
                                const selectedMethod = methods.find(item => item.id.toString() === key);

                                if (selectedMethod) {
                                    setFieldValue('payment_method', selectedMethod);
                                }
                                else {
                                    setFieldValue('payment_method', null);
                                }
                            }
                        }}
                    >
                        {
                            methods.map((method) => (
                                <Accordion.Item
                                    key={method.id}
                                    eventKey={method.id.toString()}
                                >
                                    <Accordion.Header>
                                        <div
                                            className="d-flex align-items-center w-100"
                                        >
                                            <input
                                                type="radio"
                                                name="payment_method_id"
                                                checked={selected?.id === method.id}
                                                className="input-radio me-2"
                                            />

                                            {method.name}
                                        </div>
                                    </Accordion.Header>

                                    <Accordion.Body>
                                        {method.description && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: method.description
                                                }}
                                            />
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))
                        }
                    </Accordion>
                    :
                    <p>{tCheckout('payment_methods_not_found')}</p>
            }
        </div>
    );
}

export default PaymentInfo;