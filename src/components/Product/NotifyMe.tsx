'use client';

import {useTranslations} from "next-intl";
import {Button, Form} from 'react-bootstrap';
import React, {useMemo} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import FormField from "@src/components/Form/FormField";


type Props = {
    product_id: number,
    variant_id?: number,
};

const NotifyMe = (
    {
        product_id,
        variant_id,
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

            try {
                const formData = new FormData();
                formData.append('product_id', product_id.toString());
                formData.append('email', values.email);

                if (variant_id) {
                    formData.append('variant_id', variant_id.toString());
                }
            }
            catch (error:any) {
                if (error.response && error.response.status === 422) {
                    const backendError = error.response.data.message;

                    toast.error(backendError);
                } else {
                    console.error('Unexpected error:', error);
                }
            }
            finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <>
            <div className="fw-medium border-2 fw-semibold rounded-pill">
                {tProduct('out_of_stock')}
            </div>

            <div className="mb-3">
                <h6 className="border-top fs-16 py-3 mt-4">{tProduct('notify_me')}:</h6>

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
                        className="btn btn-info rounded-pill"
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