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
import {groupCitiesByRegion, normalizePhone} from "@src/helpers";
import {CityObject} from "@interfaces/entities/city";


type Props = {
    cities: CityObject[];
};

const RegisterForm = (
    {
        cities,
    }: Props
) => {
    const tAuth = useTranslations('Auth');
    const tForm = useTranslations('Form');
    const router = useRouter();
    const groupedCities = groupCitiesByRegion(cities);

    const validationSchema = useMemo(() => Yup.object({
        name: Yup.string()
            .min(2, tForm('errors.minName'))
            .max(255, tForm('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, tForm('errors.invalidName'))
            .required(tForm('errors.required')),

        surname: Yup.string()
            .min(2, tForm('errors.minName'))
            .max(255, tForm('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, tForm('errors.invalidName'))
            .required(tForm('errors.required')),

        email: Yup.string()
            .email(tForm('errors.invalidEmail'))
            .required(tForm('errors.required')),

        phone: Yup.string()
            .required(tForm('errors.required'))
            .matches(/^(\+?380)\d{9}$/, tForm('errors.invalidPhone')),

        password: Yup.string()
            .min(8, tForm('errors.min'))
            .matches(/[A-Z]/, tForm('errors.uppercase'))
            .matches(/[0-9]/, tForm('errors.number'))
            .required(tForm('errors.required')),

        password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], tForm('errors.passwordMatch'))
            .required(tForm('errors.required')),

        dob: Yup.date()
            .nullable()
            .typeError(tForm('errors.invalidDate'))
            .max(new Date(), tForm('errors.beforeToday')),

        about: Yup.string()
            .max(255, tForm('errors.max')),
    }), [tForm]);

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
                    const stringValue = String(value ?? '').trim();

                    formData.append(
                        key,
                        key === 'phone'
                            ? normalizePhone(stringValue)
                            : stringValue
                    );
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
                label={tAuth('name')}
                name="name"
                formik={formik}
                required={true}
                type="text"
            />

            <FormField
                label={tAuth('middleName')}
                name="middle_name"
                formik={formik}
                required={false}
                type="text"
            />

            <FormField
                label={tAuth('surname')}
                name="surname"
                formik={formik}
                required={true}
                type="text"
            />

            <FormField
                label={tAuth('dob')}
                name="dob"
                formik={formik}
                required={false}
                type="date"
            />

            <SelectField
                label={tAuth('sex')}
                name="sex"
                formik={formik}
                options={[
                    {
                        label: tAuth('sex_options.man'),
                        value: 'male',
                    },
                    {
                        label: tAuth('sex_options.woman'),
                        value: 'female',
                    },
                ]}
                required={false}
            />

            <SelectField
                label={tAuth('city')}
                name="city_id"
                formik={formik}
                options={groupedCities}
                required={false}
            />

            <TextareaField
                label={tAuth('about')}
                name="about"
                formik={formik}
                required={false}
                rows={6}
            />

            <FormField
                label={tAuth('email')}
                name="email"
                formik={formik}
                required={true}
                type="email"
            />

            <PhoneFormField
                label={tAuth('phone')}
                name="phone"
                formik={formik}
                required={true}
            />

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

            <Button
                type="submit"
                className="btn btn-info"
                disabled={formik.isSubmitting}
            >
                {tForm('buttons.register')}
            </Button>
        </Form>
    );
}

export default RegisterForm;