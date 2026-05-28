'use client';

import {useTranslations} from "next-intl";
import * as Yup from 'yup';
import React, {useMemo} from "react";
import {useFormik} from "formik";
import {Form} from "react-bootstrap";
import FormField from "@src/components/Form/FormField";
import axiosClient from "@lib/axiosClient";
import {toast} from "react-toastify";


type Props = {
    description?: string | null;
};

const Subscribe = (
    {
        description,
    }: Props
) => {
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
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            console.log(values);

            setSubmitting(true);

            try {
                const formData = new FormData();
                Object.entries(values).forEach(([key, value]) => {
                    formData.append(key, String(value ?? '').trim());
                });

                const response = await axiosClient.post(
                    '/subscribe',
                    formData,
                );

                toast.success(response.data.message);
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
        <div className="col-md-6 mb-2 col-lg-3 footer-accordion-item mt-3">
            <div className="pt-md-2">
                {
                    description &&
                    <p className="text-muted">{description}</p>
                }

                <Form
                    onSubmit={formik.handleSubmit}
                    className="d-block"
                >
                    <div className="footer-subscribe position-relative">
                        <FormField
                            placeholder={`${tAuth('email')}*`}
                            name="email"
                            formik={formik}
                            required={true}
                            type="email"
                            classesString="input-text w-100 rounded-0 bg-transparent border-dark border-opacity-50"
                        />

                        <button
                            type="submit"
                            className="btn btn-dark position-absolute rounded-0"
                            disabled={formik.isSubmitting}
                        >
                            {tForm('buttons.subscribe')}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Subscribe;