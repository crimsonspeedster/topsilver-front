'use client';

import Form from 'react-bootstrap/Form';
import {useTranslations} from "next-intl";
import Input from 'react-phone-number-input/input';
import {FormPhoneFieldProps} from "@interfaces/layouts/formField";


const PhoneFormField = <T extends Record<string, any>, >(
    {
        label,
        name,
        formik,
        required,
    }: FormPhoneFieldProps<T>
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

            <Input
                defaultCountry="UA"
                value={formik.values[name]}
                onChange={(value) => {
                    formik.setFieldValue(name.toString(), value || '');
                }}
                onBlur={() => formik.setFieldTouched('phone', true)}
                className={
                    formik.touched[name] && formik.errors[name]
                        ? 'phone-input is-invalid form-control'
                        : 'phone-input form-control'
                }
            />

            {
                formik.touched[name] && formik.errors[name] &&
                <Form.Control.Feedback type="invalid">
                    {String(formik.errors[name] ?? '')}
                </Form.Control.Feedback>
            }
        </Form.Group>
    );
}

export default PhoneFormField;
