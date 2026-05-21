'use client';

import Form from 'react-bootstrap/Form';
import {useTranslations} from "next-intl";
import {FormFieldProps} from "@interfaces/layouts/formField";
import {useFormikContext} from "formik";


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
    const tForm = useTranslations('Form');
    const formikContext = useFormikContext<T>();
    const f = formik ?? formikContext;

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
                            <span> ({tForm('fields.optional')})</span>
                    }
                </Form.Label>
            }

            <Form.Control
                type={type}
                name={String(name)}
                value={String(f.values[name] ?? '')}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                className={classesString}
                isInvalid={
                    !!f.touched[name] &&
                    !!f.errors[name]
                }
                placeholder={placeholder}
            />

            <Form.Control.Feedback type="invalid">
                {String(f.errors[name] ?? '')}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default FormField;