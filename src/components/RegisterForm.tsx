"use client";

import React, {useMemo} from 'react';
import { useRouter } from 'next/navigation';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useTranslations } from 'next-intl';
import axios from "axios";

const RegisterForm = () => {
    const router = useRouter();
    const t = useTranslations('Auth');

    const validationSchema = useMemo(() => Yup.object({
        name: Yup.string()
            .min(2, t('errors.minName'))
            .max(255, t('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, t('errors.invalidName'))
            .required(t('errors.required')),

        email: Yup.string()
            .email(t('errors.invalidEmail'))
            .required(t('errors.required')),

        password: Yup.string()
            .min(8, t('errors.min'))
            .matches(/[A-Z]/, t('errors.uppercase'))
            .matches(/[0-9]/, t('errors.number'))
            .required(t('errors.required')),

        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], t('errors.passwordMatch'))
            .required(t('errors.required')),
    }), [t]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);

            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => formData.append(key, value.trim()));

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/register`,
                    formData,
                    {
                        withCredentials: true,
                    }
                );

                if (response.status === 200 || response.status === 201) {
                    router.push('/');
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
        <Form
            onSubmit={formik.handleSubmit}
        >
            <Form.Group className="mb-3">
                <Form.Label>
                    {t('name')} <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.name && !!formik.errors.name}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>
                    {t('email')} <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.email && !!formik.errors.email}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>
                    {t('password')} <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                    isInvalid={formik.touched.password && !!formik.errors.password}
                />
                <Form.Text>
                    {t('passwordRequirements')}
                    <ul className="mb-0">
                        <li>{t('minChars')}</li>
                        <li>{t('uppercase')}</li>
                        <li>{t('number')}</li>
                    </ul>
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 pb-1">
                <Form.Label>
                    {t('confirmPassword')} <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                    type="password"
                    name="password_confirmation"
                    value={formik.values.password_confirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                    isInvalid={
                        formik.touched.password_confirmation &&
                        !!formik.errors.password_confirmation
                    }
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.password_confirmation}
                </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="btn btn-info rounded-pill" disabled={formik.isSubmitting}>
                {t('submit')}
            </Button>
        </Form>
    );
}

export default RegisterForm;