'use client';

import {useTranslations} from "next-intl";
import React, {useMemo} from "react";
import FormField from "@src/components/Form/FormField";
import * as Yup from "yup";
import {useFormik} from "formik";
import { Button, Form } from 'react-bootstrap';
import axiosClient from "@lib/axiosClient";
import { toast } from 'react-toastify';
import {useAuthStore} from "@src/store/client-store";


const ProfilePasswordClient = () => {
    const tAuth = useTranslations('Auth');
    const tDashboard = useTranslations('Dashboard');
    const setUser = useAuthStore((state) => state.setUser);

    const validationSchema = useMemo(() => Yup.object({
        current_password: Yup.string()
            .required(tAuth('errors.required')),

        new_password: Yup.string()
            .min(8, tAuth('errors.min'))
            .matches(/[A-Z]/, tAuth('errors.uppercase'))
            .matches(/[0-9]/, tAuth('errors.number'))
            .required(tAuth('errors.required')),

        password_confirmation: Yup.string()
            .oneOf([Yup.ref('new_password')], tAuth('errors.passwordMatch'))
            .required(tAuth('errors.required')),
    }), [tAuth]);

    const formik = useFormik({
        initialValues: {
            current_password: '',
            new_password: '',
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

                const response = await axiosClient.patch(
                    '/me/password',
                    formData,
                );

                if (response.status === 200 || response.status === 201) {
                    setUser(response.data.data);
                    toast.success(tAuth('profile_updated_successfully'));
                    resetForm();
                }
            } catch (error: any) {
                if (error.response && error.response.status === 422) {
                    const backendErrors = error.response.data.errors;
                    const formattedErrors: Record<string, string> = {};

                    for (const key in backendErrors) {
                        if (backendErrors[key].length > 0) {
                            formattedErrors[key] = backendErrors[key][0];
                        }
                    }

                    setErrors(formattedErrors);
                } else {
                    console.error('Unexpected error:', error);
                }
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <section className="py-5">
            <div className="container">
                <div className="col-xl-6 mx-auto">
                    <h2 className="text-center">{tDashboard('password_change')}</h2>

                    <Form
                        onSubmit={formik.handleSubmit}
                    >
                        <FormField
                            label={tAuth('current_password')}
                            name="current_password"
                            formik={formik}
                            required={true}
                            type="password"
                        />

                        <FormField
                            label={tAuth('new_password')}
                            name="new_password"
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

                        <div className="d-flex align-items-center justify-content-center">
                            <Button
                                type="submit"
                                className="btn btn-info rounded-pill"
                                disabled={formik.isSubmitting}
                            >
                                {tAuth('update')}
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    );
}

export default ProfilePasswordClient;