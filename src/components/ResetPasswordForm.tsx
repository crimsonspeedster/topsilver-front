'use client';

import {useRouter} from "next/navigation";
import React, {useMemo} from "react";
import {useTranslations} from "next-intl";
import * as Yup from "yup";
import {useFormik} from "formik";
import axiosClient from "@lib/axiosClient";
import {toast} from "react-toastify";
import {Button, Form} from 'react-bootstrap';
import FormField from "@src/components/Form/FormField";


type Props = {
    email: string;
    token: string;
}

const ResetPasswordForm = (
    {
        email,
        token,
    }: Props
) => {
    const tAuth = useTranslations('Auth');
    const router = useRouter();

    const validationSchema = useMemo(() => Yup.object({
        password: Yup.string()
            .min(8, tAuth('errors.min'))
            .matches(/[A-Z]/, tAuth('errors.uppercase'))
            .matches(/[0-9]/, tAuth('errors.number'))
            .required(tAuth('errors.required')),

        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], tAuth('errors.passwordMatch'))
            .required(tAuth('errors.required')),
    }), [tAuth]);

    const formik = useFormik({
        initialValues: {
            password: '',
            password_confirmation: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            setSubmitting(true);

            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, String(value ?? '').trim());
                });
                formData.append('email', email);
                formData.append('token', token);

                const response = await axiosClient.post('/reset-password', formData);

                if (response.status === 200 || response.status === 201) {
                    toast.success(response.data.message);

                    resetForm();

                    router.replace('/');
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
                <h1 className="mb-3 text-center">{tAuth('change_your_password')}</h1>

                <Form
                    onSubmit={formik.handleSubmit}
                >
                    <FormField
                        label={tAuth('password')}
                        name="password"
                        formik={formik}
                        required={true}
                        type="password"
                    />

                    <FormField
                        label={tAuth('confirmPassword')}
                        name="password_confirmation"
                        formik={formik}
                        required={true}
                        type="password"
                    />

                    <div className="d-flex justify-content-center">
                        <Button
                            type="submit"
                            className="btn btn-info rounded-pill"
                            disabled={formik.isSubmitting}
                        >
                            {tAuth('change_my_password')}
                        </Button>
                    </div>
                </Form>
            </div>
        </section>
    );
}

export default ResetPasswordForm;