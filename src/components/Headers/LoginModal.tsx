"use client";

import React, {useMemo} from 'react';
import { Offcanvas, Button, Form } from 'react-bootstrap';
import Link from 'next/link';
import {useAuthStore} from "@src/store/client-store";
import axiosClient from "@lib/axiosClient";
import * as Yup from "yup";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import {useTranslations} from "next-intl";
import FormField from "@src/components/Form/FormField";
import PhoneFormField from "@src/components/Form/PhoneFormField";
import {useRouter} from "next/navigation";


type Props = {
    loginShow: boolean,
    handleLoginClose: ()=>void,
}

const LoginModal = (
    {
        loginShow,
        handleLoginClose,
    }: Props
) => {
    const tAuth = useTranslations('Auth');
    const tCommon = useTranslations('Common');
    const setUser = useAuthStore((state) => state.setUser);

    const router = useRouter();

    const validationSchema = useMemo(() => Yup.object({
        password: Yup.string()
            .required(tAuth('errors.required')),

        email: Yup.string()
            .email(tAuth('errors.invalidEmail')),

        phone: Yup.string()
            .matches(/^(\+?380)\d{9}$/, tAuth('errors.invalidPhone')),
    }), [tAuth]);

    const formik = useFormik({
        initialValues: {
            password: '',
            phone: '',
            email: '',
        },
        validationSchema,
        validate: (values) => {
            const errors: Record<string, string> = {};

            const email = values.email?.trim();
            const phone = values.phone?.trim();

            if (email && phone) {
                errors.email = tAuth('errors.only_one_allowed');
                errors.phone = tAuth('errors.only_one_allowed');
            }

            if (!email && !phone) {
                errors.email = tAuth('errors.required');
                errors.phone = tAuth('errors.required');
            }

            return errors;
        },
        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            setSubmitting(true);

            try {
                const login = values.email?.trim() || values.phone?.trim();

                const formData = new FormData();
                formData.append('login', login);
                formData.append('password', values.password);

                const response = await axiosClient.post('/login', formData);

                if (response.status === 200 || response.status === 201) {
                    toast.success(tAuth('authorization_successfully'));

                    setUser(response.data.data);

                    resetForm();

                    handleLoginClose();

                    router.push('/dashboard/profile');
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
        <Offcanvas show={loginShow} onHide={handleLoginClose} placement="end">
            <Offcanvas.Header className='border-bottom'>
                <h5 className="offcanvas-title fs-16 text-uppercase" id="accountOffcanvasLabel">{tAuth('authorization')}</h5>

                <button type="button" className="btn-close btn-close-none" onClick={handleLoginClose}>
                    <i className="pe-7s-close pegk" />
                </button>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Form
                    onSubmit={formik.handleSubmit}
                    className="mb-3"
                >
                    <FormField
                        label={tAuth('email')}
                        name="email"
                        formik={formik}
                        required={false}
                        type="email"
                    />

                    <p>{tCommon('or')}</p>

                    <PhoneFormField
                        label={tAuth('phone')}
                        name="phone"
                        formik={formik}
                        required={false}
                    />

                    <FormField
                        label={tAuth('password')}
                        name="password"
                        formik={formik}
                        required={true}
                        type="password"
                    />

                    <Button
                        type="submit"
                        className="btn btn-info w-100 rounded-pill"
                        disabled={formik.isSubmitting}
                    >
                        {tAuth('sign_in')}
                    </Button>
                </Form>

                <p className="text-muted">
                    {tAuth('new_customer')}

                    <Link
                        href="/register"
                        className="product-title"
                        onNavigate={handleLoginClose}
                    > {tAuth('create_your_account')}</Link>
                </p>

                <p className="text-muted">
                    {tAuth('lost_password')}

                    <Link
                        href="/forgot-password"
                        className="product-title"
                        onNavigate={handleLoginClose}
                    > {tAuth('recover_password')}</Link>
                </p>
            </Offcanvas.Body>
        </Offcanvas>
    )
}
export default LoginModal;