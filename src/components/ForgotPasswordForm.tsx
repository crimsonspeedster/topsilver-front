'use client';

import {useTranslations} from "next-intl";
import React, {useMemo} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {Button, Form} from 'react-bootstrap';
import {toast} from "react-toastify";
import FormField from "@src/components/Form/FormField";
import axiosClient from "@lib/axiosClient";


const ForgotPasswordForm = () => {
    const tAuth = useTranslations('Auth');
    const tCommon = useTranslations('Common');

    const validationSchema = useMemo(() => Yup.object({
        email: Yup.string()
            .email(tAuth('errors.invalidEmail'))
            .required(tAuth('errors.required')),
    }), [tAuth]);

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            setSubmitting(true);

            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, String(value ?? '').trim());
                });

                const response = await axiosClient.post('/forgot-password', formData);

                if (response.status === 200 || response.status === 201) {
                    toast.success(response.data.message);

                    resetForm();
                }
            } catch (error: any) {
                if (error.response && error.response.status === 422) {
                    const backendError = error.response.data.message;

                    toast.error(backendError);
                } else {
                    console.error('Unexpected error:', error);
                }
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="mb-3 text-center">{tAuth('lost_password')}</h1>

                <p className="text-muted text-center mb-4">{tCommon('enter_your_email')}</p>

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

                    <div className="d-flex justify-content-center">
                        <Button
                            type="submit"
                            className="btn btn-info rounded-pill"
                            disabled={formik.isSubmitting}
                        >
                            {tAuth('send_reset_link')}
                        </Button>
                    </div>
                </Form>
            </div>
        </section>
    );
}

export default ForgotPasswordForm;