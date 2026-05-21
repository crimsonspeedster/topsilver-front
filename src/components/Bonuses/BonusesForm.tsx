'use client';

import {useTranslations} from "next-intl";
import {useCartStore} from "@src/store/cart-store";
import {useMemo} from "react";
import * as Yup from "yup";
import {useAuthStore} from "@src/store/client-store";
import axiosClient from "@lib/axiosClient";
import {BonusesObject} from "@interfaces/entities/bonuses";
import {useFormik} from "formik";
import {toast} from "react-toastify";
import { Button, Form } from 'react-bootstrap';
import FormField from "@src/components/Form/FormField";


type Props = {
    bonuses: BonusesObject|null;
};

const BonusesForm = (
    {
        bonuses,
    }: Props
) => {
    const tForm = useTranslations('Form');
    const tCart = useTranslations('Cart');
    const setCart = useCartStore((state) => state.setCart);

    const validationSchema = useMemo(() => Yup.object({
        amount: Yup.number()
            .min(0)
            .max(Number(bonuses?.active_total ?? '0'))
            .required(tForm('errors.required')),
    }), [tForm]);

    const formik = useFormik({
        initialValues: {
            amount: '',
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            setSubmitting(true);

            try {
                const formData = new FormData();
                formData.append('amount', values.amount.toString());

                const response = await axiosClient.patch(
                    '/cart/bonuses/',
                    formData,
                );

                setCart(response.data.data);

                toast.success(tCart('bonuses_added'));
                resetForm();
            } catch (error: any) {
                if (error.response) {
                    switch (error.response.status) {
                        case 422:
                            toast.error(error.response.data.message);
                            break;
                        case 404:
                            toast.error(tCart('bonuses_invalid'));
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
                label={tCart('amount')}
                name="amount"
                formik={formik}
                required={true}
                type="number"
            />

            <Button
                type="submit"
                className="btn btn-info rounded-pill"
                disabled={formik.isSubmitting}
            >
                {tForm('buttons.send')}
            </Button>
        </Form>
    );
}

export default BonusesForm;