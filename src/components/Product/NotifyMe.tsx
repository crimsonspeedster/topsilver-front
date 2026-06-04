'use client';

import {useTranslations} from "next-intl";
import {Button, Form} from 'react-bootstrap';
import React, {useMemo} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import FormField from "@src/components/Form/FormField";
import axiosClient from "@lib/axiosClient";


type Props = {
    product_id: number,
};

const NotifyMe = (
    {
        product_id,
    }: Props
) => {
    const tProduct = useTranslations('Product');
    const tForm = useTranslations('Form');
    const tAuth = useTranslations('Auth');

    const validationSchema = useMemo(() => Yup.object({
        email: Yup.string()
            .email(tForm('errors.invalidEmail'))
            .required(tForm('errors.required')),
    }), [tForm]);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values, {setSubmitting, setErrors, resetForm}) => {
            setSubmitting(true);

            const formData = new FormData();
            formData.append('email', values.email);

            try {
                const res = await axiosClient.post(`/products/${product_id}/notifications`, formData);

                toast.success(res.data.message);

                resetForm();
            }
            catch (error:any) {
                if (error.response && error.response.status === 422) {
                    const backendError = error.response.data.message;

                    toast.error(backendError);
                }
            }
            finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <>
            <p className="fw-medium border-2 text-danger fw-semibold">{tProduct('out_of_stock')}</p>

            <div className="mb-3">
                <p className="border-top fs-16 py-3 mt-4 fw-bold">{tProduct('notify_me')}:</p>

                <Form
                    onSubmit={formik.handleSubmit}
                >
                    <FormField
                        label={tAuth('email')}
                        name="email"
                        formik={formik}
                        required={true}
                        type="email"
                    />

                    <Button
                        type="submit"
                        className="btn btn-info"
                        disabled={formik.isSubmitting}
                    >
                        {tForm('buttons.notify_button')}
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default NotifyMe;