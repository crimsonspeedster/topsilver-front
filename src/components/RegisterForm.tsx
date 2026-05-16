"use client";

import React, {useMemo} from 'react';
import { useRouter } from 'next/navigation';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useTranslations } from 'next-intl';
import axios from "axios";
import FormField from "@src/components/Form/FormField";
import PhoneFormField from "@src/components/Form/PhoneFormField";
import axiosClient from "@lib/axiosClient";
import SelectField from "@src/components/Form/SelectField";
import TextareaField from "@src/components/Form/TextareaField";
import {groupCitiesByRegion} from "@src/helpers";
import {CityObject} from "@interfaces/entities/city";


type Props = {
    cities: CityObject[];
};

const RegisterForm = (
    {
        cities,
    }: Props
) => {
    const router = useRouter();
    const groupedCities = groupCitiesByRegion(cities);
    const t = useTranslations('Auth');

    const validationSchema = useMemo(() => Yup.object({
        name: Yup.string()
            .min(2, t('errors.minName'))
            .max(255, t('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, t('errors.invalidName'))
            .required(t('errors.required')),

        surname: Yup.string()
            .min(2, t('errors.minName'))
            .max(255, t('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, t('errors.invalidName'))
            .required(t('errors.required')),

        email: Yup.string()
            .email(t('errors.invalidEmail'))
            .required(t('errors.required')),

        phone: Yup.string()
            .required(t('errors.required'))
            .matches(/^(\+?380)\d{9}$/, t('errors.invalidPhone')),

        password: Yup.string()
            .min(8, t('errors.min'))
            .matches(/[A-Z]/, t('errors.uppercase'))
            .matches(/[0-9]/, t('errors.number'))
            .required(t('errors.required')),

        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], t('errors.passwordMatch'))
            .required(t('errors.required')),

        dob: Yup.date()
            .nullable()
            .typeError(t('errors.invalidDate'))
            .max(new Date(), t('errors.beforeToday')),

        about: Yup.string()
            .max(255, t('errors.max')),
    }), [t]);

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            middle_name: '',
            dob: '',
            sex: '',
            city_id: '',
            email: '',
            phone: '',
            password: '',
            password_confirmation: '',
            about: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);

            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, String(value ?? '').trim());
                });

                const response = await axiosClient.post(
                    '/register',
                    formData,
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
            <FormField
                label={t('name')}
                name="name"
                formik={formik}
                required={true}
                type="text"
            />

            <FormField
                label={t('middleName')}
                name="middle_name"
                formik={formik}
                required={false}
                type="text"
            />

            <FormField
                label={t('surname')}
                name="surname"
                formik={formik}
                required={true}
                type="text"
            />

            <FormField
                label={t('dob')}
                name="dob"
                formik={formik}
                required={false}
                type="date"
            />

            <SelectField
                label={t('sex')}
                name="sex"
                formik={formik}
                options={[
                    {
                        label: t('sex_options.man'),
                        value: 'male',
                    },
                    {
                        label: t('sex_options.woman'),
                        value: 'female',
                    },
                ]}
                required={false}
            />

            <SelectField
                label={t('city')}
                name="city_id"
                formik={formik}
                options={groupedCities}
                required={false}
            />

            <TextareaField
                label={t('about')}
                name="about"
                formik={formik}
                required={false}
                rows={6}
            />

            <FormField
                label={t('email')}
                name="email"
                formik={formik}
                required={true}
                type="email"
            />

            <PhoneFormField
                label={t('phone')}
                name="phone"
                formik={formik}
                required={true}
            />

            <FormField
                label={t('password')}
                name="password"
                formik={formik}
                required={true}
                type="password"
            />

            <FormField
                label={t('confirmPassword')}
                name="password_confirmation"
                formik={formik}
                required={true}
                type="password"
            />

            <Button
                type="submit"
                className="btn btn-info rounded-pill"
                disabled={formik.isSubmitting}
            >
                {t('register')}
            </Button>
        </Form>
    );
}

export default RegisterForm;