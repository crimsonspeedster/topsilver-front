'use client';

import Form from 'react-bootstrap/Form';
import {useTranslations} from "next-intl";
import Input from 'react-phone-number-input/input';
import {FormPhoneFieldProps} from "@interfaces/layouts/formField";
import {useFormikContext} from "formik";


const PhoneFormField = <T extends Record<string, any>, >(
    {
        label,
        name,
        formik,
        required,
    }: FormPhoneFieldProps<T>
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

            <Input
                defaultCountry="UA"
                value={f.values[name]}
                onChange={(value) => {
                    f.setFieldValue(name.toString(), value || '');
                }}
                onBlur={() => f.setFieldTouched('phone', true)}
                className={
                    f.touched[name] && f.errors[name]
                        ? 'phone-input is-invalid form-control'
                        : 'phone-input form-control'
                }
            />

            {
                f.touched[name] && f.errors[name] &&
                <Form.Control.Feedback type="invalid">
                    {String(f.errors[name] ?? '')}
                </Form.Control.Feedback>
            }
        </Form.Group>
    );
}

export default PhoneFormField;
