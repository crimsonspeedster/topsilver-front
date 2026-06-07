'use client';

import {useTranslations} from "next-intl";
import {useMemo, useState} from "react";
import PersonalInfo from "@src/components/Checkout/PersonalInfo";
import * as Yup from "yup";
import {Formik} from "formik";
import axiosClient from "@lib/axiosClient";
import { Form } from 'react-bootstrap';
import OrderInfo from "@src/components/Checkout/OrderInfo";
import ShippingInfo from "@src/components/Checkout/ShippingInfo";
import PaymentInfo from "@src/components/Checkout/PaymentInfo";
import NotesInfo from "@src/components/Checkout/NotesInfo";
import {CartObject} from "@interfaces/entities/cart";
import {PaymentMethodObject} from "@interfaces/entities/payment-method";
import {ShippingMethodObject} from "@interfaces/entities/shipping-method";
import {UserObject} from "@interfaces/entities/user";
import {getUserFormData} from "@src/helpers";
import CheckoutUserSync from "@src/components/Checkout/CheckoutUserSync";
import {CheckoutFormValues} from "@interfaces/layouts/checkoutForm";
import {useCartStore} from "@src/store/cart-store";
import {useRouter} from "next/navigation";
import LiqPayForm from "@src/components/LiqPayForm";
import {LiqPayProps} from "@interfaces/common/layouts";
import {RelationPageSettingsObject} from "@interfaces/entities/settings";


type Props = {
    cart: CartObject,
    paymentMethods: PaymentMethodObject[],
    shippingMethods: ShippingMethodObject[],
    initUserData: UserObject|null,
    rulesPage?: RelationPageSettingsObject | null,
};

const CheckoutForm = (
    props: Props
) => {
    const tForm = useTranslations('Form');
    const resetCart = useCartStore((state) => state.reset);
    const router = useRouter();

    const [liqPayData, setLiqPayData] = useState<null | LiqPayProps>(null);

    const validationSchema = useMemo(() => Yup.object({
        first_name: Yup.string()
            .min(2, tForm('errors.minName'))
            .max(255, tForm('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, tForm('errors.invalidName'))
            .required(tForm('errors.required')),

        middle_name: Yup.string()
            .min(2, tForm('errors.minName'))
            .max(255, tForm('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, tForm('errors.invalidName')),

        last_name: Yup.string()
            .min(2, tForm('errors.minName'))
            .max(255, tForm('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, tForm('errors.invalidName'))
            .required(tForm('errors.required')),

        phone: Yup.string()
            .required(tForm('errors.required'))
            .matches(/^(\+?380)\d{9}$/, tForm('errors.invalidPhone')),

        email: Yup.string()
            .email(tForm('errors.invalidEmail')),

        notes: Yup.string()
            .max(255, tForm('errors.max')),

        rules: Yup.boolean()
            .oneOf([true], tForm('errors.required')),

        shop_id: Yup.string().when('shipping_method', {
            is: (shipping_method: ShippingMethodObject) => shipping_method.type === 'local_pickup',
            then: (schema) =>
                schema.required(tForm('errors.required')),
            otherwise: (schema) =>
                schema.notRequired(),
        }),

        np_area: Yup.string().when('shipping_method', {
            is: (shipping_method: ShippingMethodObject|null) => shipping_method?.type === 'nova_poshta_warehouse',
            then: (schema) =>
                schema.required(tForm('errors.required')),
            otherwise: (schema) =>
                schema.notRequired(),
        }),

        np_city: Yup.mixed().when('shipping_method', {
            is: (sm: ShippingMethodObject|null) => sm?.type === 'nova_poshta_warehouse',
            then: (schema) => schema.required(tForm('errors.required')),
            otherwise: (schema) =>
                schema.notRequired(),
        }),

        np_warehouse: Yup.mixed().when('shipping_method', {
            is: (sm: ShippingMethodObject|null) => sm?.type === 'nova_poshta_warehouse',
            then: (schema) => schema.required(tForm('errors.required')),
            otherwise: (schema) =>
                schema.notRequired(),
        }),

        np_locality: Yup.mixed().when('shipping_method', {
            is: (sm: ShippingMethodObject|null) => sm?.type === 'nova_poshta_courier',
            then: (schema) => schema.required(tForm('errors.required')),
            otherwise: (schema) =>
                schema.notRequired(),
        }),

        np_street: Yup.mixed().when('shipping_method', {
            is: (sm: ShippingMethodObject|null) => sm?.type === 'nova_poshta_courier',
            then: (schema) => schema.required(tForm('errors.required')),
            otherwise: (schema) =>
                schema.notRequired(),
        }),

        np_house_number: Yup.string().when('shipping_method', {
            is: (shipping_method: ShippingMethodObject|null) => shipping_method?.type === 'nova_poshta_courier',
            then: (schema) =>
                schema.required(tForm('errors.required')),
            otherwise: (schema) =>
                schema.notRequired(),
        }),
    }), [tForm]);

    const initialValues: CheckoutFormValues = useMemo(() => ({
        ...getUserFormData(props.initUserData),

        notes: '',

        payment_method: props.paymentMethods?.[0] ?? null,

        shipping_method: props.shippingMethods?.[0] ?? null,

        shop_id: '',

        np_area: '',
        np_city: null,
        np_warehouse: null,

        np_locality: null,
        np_street: null,
        np_house_number: '',
        np_apartment_number: '',

        rules: false,
    }), [props.initUserData]);

    const handleSubmit = async (values: typeof initialValues, helpers: any) => {
        helpers.setSubmitting(true);

        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, String(value ?? '').trim());
        });

        if (values.shipping_method) {
            console.log(values);

            formData.append('shipping_method_id', values.shipping_method.id.toString())

            switch (values.shipping_method.type) {
                case 'local_pickup':
                    break;

                case 'nova_poshta_warehouse':
                    formData.append('np_warehouse_ref', values.np_warehouse?.value?.toString() ?? '');
                    formData.append('np_city_ref', values.np_city?.value?.toString() ?? '');
                    break;

                case 'nova_poshta_courier':
                    formData.append('np_street_ref', values.np_street?.value?.toString() ?? '');
                    formData.append('np_street_name', values.np_street?.label?.toString() ?? '');
                    formData.append('np_locality_ref', values.np_locality?.label?.toString() ?? '');
                    formData.append('np_locality_name', values.np_locality?.label?.toString() ?? '');
                    break;

                default:
                    break;
            }
        }

        if (values.payment_method) {
            formData.append('payment_method_id', values.payment_method.id.toString())
        }

        try {
            const response = await axiosClient.post('/checkout', formData);

            switch (response.data.data.payment_type) {
                case 'cod':
                    router.replace(`/order/success/${response.data.data.public_token}`);
                    return;

                case 'plata_by_mono':
                    router.replace(response.data.payment.data.pageUrl);
                    return;

                case 'liqpay':
                    setLiqPayData({
                        data: response.data.payment.data.data,
                        signature: response.data.payment.data.signature,
                        url: response.data.payment.data.url,
                    });
                    return;

                default:
                    return;
            }
        } catch (error: any) {
            console.error(error);
        } finally {
            resetCart();
            helpers.setSubmitting(false);
        }
    };

    return (
        <section className="py-5">
            <div className="container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="row">
                            <CheckoutUserSync />

                            <div className="col-md-6 col-lg-7">
                                <PersonalInfo />

                                <ShippingInfo
                                    methods={props.shippingMethods}
                                />

                                <PaymentInfo
                                    methods={props.paymentMethods}
                                />

                                <NotesInfo />
                            </div>

                            <div className="col-md-6 col-lg-5 mt-5 mt-md-0">
                                <OrderInfo
                                    rulesPage={props.rulesPage}
                                    cart={props.cart}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {
                liqPayData &&
                <LiqPayForm
                    data={liqPayData.data}
                    signature={liqPayData.signature}
                    url={liqPayData.url}
                />
            }
        </section>
    );
}

export default CheckoutForm;