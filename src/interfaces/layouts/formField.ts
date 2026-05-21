import { GroupBase } from 'react-select';
import {FormikProps} from "formik";

export type FormFieldProps<T extends Record<string, any>> = {
    label?: string;
    placeholder?: string;
    classesString?: string;
    name: keyof T;
    type?: string;
    formik?: FormikProps<T>;
    required: boolean;
};

export type FormPhoneFieldProps<
    T extends Record<string, any>
> = Omit<FormFieldProps<T>, 'type'>;

export type SelectOption = {
    label: string;
    value: string | number;
};

export type SelectGroup = GroupBase<SelectOption>;

export type FormSelectFieldProps<T extends Record<string, any>> = {
    label?: string;
    name: keyof T;
    formik?: FormikProps<T>;
    options: readonly (SelectOption | SelectGroup)[];
    required?: boolean;
    isMulti?: boolean;
    placeholder?: string;
};

export type FormTextareaFieldProps<T extends Record<string, any>> = {
    label: string;
    name: keyof T;
    formik?: FormikProps<T>;
    required?: boolean;
    placeholder?: string;
    rows?: number;
};