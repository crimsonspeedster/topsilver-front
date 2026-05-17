'use client';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import { UserObject } from "@interfaces/entities/user";
import { CityObject } from "@interfaces/entities/city";
import { Button, Form } from 'react-bootstrap';
import {useTranslations} from "next-intl";
import React, {useEffect, useMemo, useState} from "react";
import FormField from "@src/components/Form/FormField";
import PhoneFormField from "@src/components/Form/PhoneFormField";
import SelectField from "@src/components/Form/SelectField";
import TextareaField from "@src/components/Form/TextareaField";
import {groupCitiesByRegion} from "@src/helpers";
import axiosClient from "@lib/axiosClient";
import { toast } from 'react-toastify';
import {useAuthStore} from "@src/store/client-store";


type Props = {
    cities: CityObject[];
};

export default function ProfileClient({ cities }: Props) {
    const tAuth = useTranslations('Auth');
    const groupedCities = groupCitiesByRegion(cities);
    const tDashboard = useTranslations('Dashboard');
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);

    const validationSchema = useMemo(() => Yup.object({
        name: Yup.string()
            .min(2, tAuth('errors.minName'))
            .max(255, tAuth('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, tAuth('errors.invalidName'))
            .required(tAuth('errors.required')),

        surname: Yup.string()
            .min(2, tAuth('errors.minName'))
            .max(255, tAuth('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, tAuth('errors.invalidName'))
            .required(tAuth('errors.required')),

        middle_name: Yup.string()
            .min(2, tAuth('errors.minName'))
            .max(255, tAuth('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, tAuth('errors.invalidName')),

        email: Yup.string()
            .email(tAuth('errors.invalidEmail'))
            .required(tAuth('errors.required')),

        phone: Yup.string()
            .required(tAuth('errors.required'))
            .matches(/^(\+?380)\d{9}$/, tAuth('errors.invalidPhone')),

        dob: Yup.date()
            .nullable()
            .typeError(tAuth('errors.invalidDate'))
            .max(new Date(), tAuth('errors.beforeToday')),

        about: Yup.string()
            .max(255, tAuth('errors.max')),
    }), [tAuth]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user?.profile?.name ?? '',
            surname: user?.profile?.surname ?? '',
            middle_name: user?.profile?.middle_name ?? '',
            dob: user?.profile?.dob
                ? user.profile.dob.split('T')[0]
                : '',
            sex: user?.profile?.sex ?? '',
            city_id: user?.profile?.city?.id ?? '',
            about: user?.profile?.about ?? '',
            email: user?.email ?? '',
            phone: user?.phone ?? '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            setSubmitting(true);

            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, String(value ?? '').trim());
                });

                const response = await axiosClient.patch(
                    '/me/profile',
                    formData,
                );

                if (response.status === 200 || response.status === 201) {
                    setUser(response.data.data);
                    toast.success(tAuth('profile_updated_successfully'));
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
                    <h1 className="text-center">{tDashboard('profile')}</h1>

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

                        {
                            cities.length > 0 &&
                            <SelectField
                                label={tAuth('city')}
                                name="city_id"
                                formik={formik}
                                options={groupedCities}
                                required={false}
                            />
                        }

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