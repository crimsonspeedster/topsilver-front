"use client";

import {Form, Modal} from "react-bootstrap";
import * as Yup from "yup";
import {useFormik} from "formik";
import {useMemo, useState} from "react";
import {useTranslations} from "next-intl";
import {toast} from "react-toastify";
import TextareaField from "@src/components/Form/TextareaField";
import {FaStar} from "react-icons/fa6";
import axiosClient from "@lib/axiosClient";


type Props = {
    show: boolean,
    handleClose: () => void,
    parent_id?: number | null,
    product_id: number,
};

const ReviewPopup = (
    {
        show,
        parent_id,
        product_id,
        handleClose,
    }: Props
) => {
    const tForm = useTranslations('Form');
    const tReviews = useTranslations('Reviews');

    const [hoveredRating, setHoveredRating] = useState<number>(0);

    const isReply = !!parent_id;

    const validationSchema = useMemo(() => Yup.object({
        comment: Yup.string()
            .required(tForm('errors.required')),

        ...(isReply
            ? {}
            : {
                rating: Yup.number()
                    .min(1)
                    .max(5)
                    .required(tForm('errors.required')),
            }),
    }), [tForm, isReply]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            comment: "",
            rating: 0,
            parent_id,
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            setSubmitting(true);

            const formData = new FormData();
            formData.append("comment", values.comment);

            if (parent_id) {
                formData.append('parent_id', parent_id.toString());
            }
            else {
                formData.append('rating', values.rating.toString());
            }

            try {
                const response = await axiosClient.post(`/products/${product_id}/reviews`, formData);

                toast.success(tReviews('review_sent'));

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
                    {
                        !isReply && (
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    {tReviews('rating')}

                                    <span className="text-danger"> *</span>
                                </Form.Label>

                                <div className="d-flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            className="btn p-0 border-0 bg-transparent"
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            onClick={() => formik.setFieldValue('rating', star)}
                                        >
                                            <FaStar
                                                size={28}
                                                color={
                                                    star <= (hoveredRating || formik.values.rating)
                                                        ? '#ffc107'
                                                        : '#dee2e6'
                                                }
                                            />
                                        </button>
                                    ))}
                                </div>

                                <Form.Control.Feedback type="invalid">
                                    {formik.errors.rating}
                                </Form.Control.Feedback>
                            </Form.Group>
                        )
                    }

                    <TextareaField
                        label={tReviews('comment')}
                        name="comment"
                        formik={formik}
                        required={true}
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

export default ReviewPopup;