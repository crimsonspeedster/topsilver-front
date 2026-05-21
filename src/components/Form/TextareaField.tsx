'use client';

import Form from 'react-bootstrap/Form';
import {FormTextareaFieldProps} from "@interfaces/layouts/formField";
import {useTranslations} from "next-intl";
import {useFormikContext} from "formik";


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
    const tForm = useTranslations('Form');
    const formikContext = useFormikContext<T>();
    const f = formik ?? formikContext;

    return (
        <Form.Group className="mb-3">
            <Form.Label>
                {label}

                {
                    required ?
                        <span className="text-danger"> *</span>
                        :
                        <span> ({tForm('fields.optional')})</span>
                }
            </Form.Label>

            <Form.Control
                as="textarea"
                rows={rows}
                name={String(name)}
                value={f.values[name] ?? ''}
                placeholder={placeholder}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                isInvalid={
                    !!f.touched[name] &&
                    !!f.errors[name]
                }
            />

            <Form.Control.Feedback type="invalid">
                {String(f.errors[name] ?? '')}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default TextareaField;