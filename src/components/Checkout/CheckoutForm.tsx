'use client';

import {useTranslations} from "next-intl";
import {useMemo} from "react";
import PersonalInfo from "@src/components/Checkout/PersonalInfo";
import * as Yup from "yup";
import {Formik} from "formik";
import axiosClient from "@lib/axiosClient";
import {toast} from "react-toastify";
import { Form } from 'react-bootstrap';
import OrderInfo from "@src/components/Checkout/OrderInfo";
import ShippingInfo from "@src/components/Checkout/ShippingInfo";
import PaymentInfo from "@src/components/Checkout/PaymentInfo";
import NotesInfo from "@src/components/Checkout/NotesInfo";


const CheckoutForm = () => {
    const tForm = useTranslations('Form');

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
    }), [tForm]);

    const initialValues = {
        first_name: '',
        middle_name: '',
        last_name: '',
        phone: '',
        email: '',
        notes: '',

        payment_method_id: '',

        shipping_method_id: '',

        shop_id: '',

        np_warehouse_ref: '',
        np_city: '',
        np_street: '',
        np_house_number: '',
        np_apartment_number: '',
    };

    const handleSubmit = async (values: typeof initialValues, helpers: any) => {
        console.log(values);

        try {
            helpers.setSubmitting(true);
        } catch (error: any) {
            console.error(error);
        } finally {
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
                            <div className="col-md-6 col-lg-7">
                                <PersonalInfo

                                />

                                <ShippingInfo

                                />

                                <PaymentInfo

                                />

                                <NotesInfo />
                            </div>

                            <div className="col-md-6 col-lg-5 mt-5 mt-md-0">
                                <OrderInfo

                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}

export default CheckoutForm;