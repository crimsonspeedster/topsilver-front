'use client';

import Form from 'react-bootstrap/Form';
import {useTranslations} from "next-intl";
import {FormFieldProps} from "@interfaces/layouts/formField";


const FormField = <T extends Record<string, any>, >(
    {
        label,
        name,
        type = 'text',
        formik,
        required,
        classesString,
        placeholder,
    }: FormFieldProps<T>
) => {
    const tAuth = useTranslations('Auth');

    return (
        <Form.Group className="mb-3">
            {
                label &&
                <Form.Label>
                    {label}

                    {
                        required ?
                            <span className="text-danger"> *</span>
                            :
                            <span> ({tAuth('optional')})</span>
                    }
                </Form.Label>
            }

            <Form.Control
                type={type}
                name={String(name)}
                value={String(formik.values[name] ?? '')}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={classesString}
                isInvalid={
                    !!formik.touched[name] &&
                    !!formik.errors[name]
                }
                placeholder={placeholder}
            />

            <Form.Control.Feedback type="invalid">
                {String(formik.errors[name] ?? '')}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default FormField;