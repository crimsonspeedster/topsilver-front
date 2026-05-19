'use client';

import {useTranslations} from "next-intl";
import {useCartStore} from "@src/store/cart-store";
import {useMemo} from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import axiosClient from "@lib/axiosClient";
import { Button, Form } from 'react-bootstrap';
import {toast} from "react-toastify";
import FormField from "@src/components/Form/FormField";


const CertificateForm = () => {
    const tAuth = useTranslations('Auth');
    const tCart = useTranslations('Cart');
    const setCart = useCartStore((state) => state.setCart);

    const validationSchema = useMemo(() => Yup.object({
        code: Yup.string()
            .required(tAuth('errors.required')),
    }), [tAuth]);

    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            setSubmitting(true);

            try {
                const formData = new FormData();
                formData.append('code', values.code);

                const response = await axiosClient.post(
                    '/cart/certificates/',
                    formData,
                );

                setCart(response.data.data);
                toast.success(tCart('certificate_added'));
                resetForm();
            } catch (error: any) {
                if (error.response) {
                    switch (error.response.status) {
                        case 422:
                            toast.error(error.response.data.message);
                            break;
                        case 404:
                            toast.error(tCart('certificate_invalid'));
                            break;
                        case 401:
                            toast.error(tCart('auth_invalid'));
                            break;
                        default:
                            break;
                    }
                }
                else {
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
                label={tCart('code')}
                name="code"
                formik={formik}
                required={true}
                type="text"
            />

            <Button
                type="submit"
                className="btn btn-info rounded-pill"
                disabled={formik.isSubmitting}
            >
                {tCart('send')}
            </Button>
        </Form>
    );
}

export default CertificateForm;