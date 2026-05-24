import Form from 'react-bootstrap/Form';
import {FormSelectFieldProps} from "@interfaces/layouts/formField";
import dynamic from "next/dynamic";
import {useTranslations} from "next-intl";
import {useFormikContext} from "formik";


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
    const tForm = useTranslations('Form');
    const formikContext = useFormikContext<T>();
    const f = formik ?? formikContext;

    const value = f.values[name];

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

                        f.setFieldValue(name as string, values);
                    } else {
                        f.setFieldValue(
                            name as string,
                            value?.value ?? ''
                        );
                    }
                }}
                onBlur={() => f.setFieldTouched(name as string, true)}
            />

            {f.touched[name as string] && f.errors[name as string] && (
                <div className="invalid-feedback d-block">
                    {String(f.errors[name as string])}
                </div>
            )}
        </Form.Group>
    );
};

export default SelectField;