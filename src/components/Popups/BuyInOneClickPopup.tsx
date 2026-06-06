"use client";

import {Form, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {useFormik} from "formik";
import React, {useMemo} from "react";
import {useTranslations} from "next-intl";
import {toast} from "react-toastify";
import axiosClient from "@lib/axiosClient";
import FormField from "@src/components/Form/FormField";
import PhoneFormField from "@src/components/Form/PhoneFormField";
import TextareaField from "@src/components/Form/TextareaField";


type Props = {
    show: boolean,
    handleClose: () => void,
    productId: number,
    variationId: number | null,
};

const BuyInOneClickPopup = (
    {
        productId,
        variationId,
        show,
        handleClose,
    }: Props
) => {
    const tForm = useTranslations('Form');
    const tAuth = useTranslations('Auth');
    const tProduct = useTranslations('Product');
    const tCheckout = useTranslations('Checkout');

    const validationSchema = useMemo(() => Yup.object({
        name: Yup.string()
            .min(2, tForm('errors.minName'))
            .max(255, tForm('errors.max'))
            .matches(/^[\p{L}\s'\-\.]+$/u, tForm('errors.invalidName'))
            .required(tForm('errors.required')),

        phone: Yup.string()
            .required(tForm('errors.required'))
            .matches(/^(\+?380)\d{9}$/, tForm('errors.invalidPhone')),

        email: Yup.string()
            .email(tForm('errors.invalidEmail')),

        comment: Yup.string()
            .max(255, tForm('errors.max')),
    }), [tForm]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: '',
            phone: '',
            comment: '',
            email: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            setSubmitting(true);

            console.log(values, productId, variationId);

            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('phone', values.phone);
            formData.append('comment', values.comment);
            formData.append('email', values.email);
            formData.append('product_id', productId.toString());

            if (variationId) {
                formData.append('variant_id', variationId.toString());
            }

            try {
                const res = await axiosClient.post('/buy-in-one-click', formData);

                toast.success(res.data.message);

                resetForm();
                handleClose();
            } catch (error: any) {
                const backendError = error.response.data.message;

                toast.error(backendError);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="modal-overl"
            size="lg"
        >
            <Modal.Body>
                <div className="text-end position-fixed top-0 end-0">
                    <button
                        type="button"
                        className="btn-close btn-close1 p-4"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={handleClose}
                    ></button>
                </div>

                <Form
                    onSubmit={formik.handleSubmit}
                >
                    <h2 className="text-center">{tProduct('buy_in_one_click')}</h2>

                    <FormField
                        label={tAuth('name')}
                        name="name"
                        formik={formik}
                        required={true}
                        type="text"
                    />

                    <PhoneFormField
                        label={tAuth('phone')}
                        name="phone"
                        formik={formik}
                        required={true}
                    />

                    <FormField
                        label={tAuth('email')}
                        name="email"
                        formik={formik}
                        required={false}
                        type="email"
                    />

                    <TextareaField
                        label={tCheckout('notes')}
                        name="comment"
                        formik={formik}
                        required={false}
                        rows={6}
                    />

                    <button
                        type="submit"
                        className="btn btn-primary rounded-pill"
                        disabled={formik.isSubmitting}
                    >
                        {tForm('buttons.send')}
                    </button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default BuyInOneClickPopup;