'use client';

import Form from 'react-bootstrap/Form';
import {FormTextareaFieldProps} from "@interfaces/layouts/formField";
import {useTranslations} from "next-intl";


const TextareaField = <T extends Record<string, any>,>(
    {
        label,
        name,
        formik,
        required = false,
        placeholder,
        rows = 4,
    }: FormTextareaFieldProps<T>
) => {
    const tAuth = useTranslations('Auth');

    return (
        <Form.Group className="mb-3">
            <Form.Label>
                {label}

                {
                    required ?
                        <span className="text-danger"> *</span>
                        :
                        <span> ({tAuth('optional')})</span>
                }
            </Form.Label>

            <Form.Control
                as="textarea"
                rows={rows}
                name={String(name)}
                value={formik.values[name] ?? ''}
                placeholder={placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                    !!formik.touched[name] &&
                    !!formik.errors[name]
                }
            />

            <Form.Control.Feedback type="invalid">
                {String(formik.errors[name] ?? '')}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default TextareaField;