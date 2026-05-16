import Form from 'react-bootstrap/Form';
import {FormSelectFieldProps} from "@interfaces/layouts/formField";
import dynamic from "next/dynamic";
import {useTranslations} from "next-intl";


const Select = dynamic(() => import('react-select'), {
    ssr: false,
});

const SelectField = <T extends Record<string, any>,>(
    {
        label,
        name,
        formik,
        options,
        required = false,
        isMulti = false,
        placeholder,
    }: FormSelectFieldProps<T>
) => {
    const tAuth = useTranslations('Auth');

    const value = formik.values[name];

    const flatOptions = options.flatMap((opt: any) =>
        'options' in opt ? opt.options : opt
    );

    const selectedValue = isMulti
        ? flatOptions.filter((opt) =>
            Array.isArray(value) ? value.includes(opt.value) : false
        )
        : flatOptions.find((opt) => opt.value === value) || null;

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

            <Select
                options={options}
                value={selectedValue}
                isMulti={isMulti}
                placeholder={placeholder}
                isSearchable
                isClearable
                onChange={(selected) => {
                    const value = selected as any;

                    if (isMulti) {
                        const values = Array.isArray(value)
                            ? value.map((item) => item.value)
                            : [];

                        formik.setFieldValue(name as string, values);
                    } else {
                        formik.setFieldValue(
                            name as string,
                            value?.value ?? ''
                        );
                    }
                }}
                onBlur={() => formik.setFieldTouched(name as string, true)}
            />

            {formik.touched[name] && formik.errors[name] && (
                <div className="invalid-feedback d-block">
                    {String(formik.errors[name])}
                </div>
            )}
        </Form.Group>
    );
};

export default SelectField;