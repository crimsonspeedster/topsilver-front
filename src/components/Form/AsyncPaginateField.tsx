import Form from 'react-bootstrap/Form';
import {FormikProps, useFormikContext} from 'formik';
import { useTranslations } from 'next-intl';
import { LoadOptions, AsyncPaginateProps } from 'react-select-async-paginate';
import {SelectOption} from "@interfaces/layouts/formField";
import dynamic from "next/dynamic";
import {GroupBase} from "react-select";
import React from "react";


const AsyncPaginate = dynamic(
    () => import('react-select-async-paginate').then(mod => mod.AsyncPaginate),
    {
        ssr: false,
    }
) as <
    OptionType,
    Group extends GroupBase<OptionType>,
    Additional,
    IsMulti extends boolean = false,
>(
    props: AsyncPaginateProps<
        OptionType,
        Group,
        Additional,
        IsMulti
    >
) => React.ReactElement;

type Additional = {
    page: number;
};

type Props<T> = {
    label?: string;
    name: keyof T;
    formik?: FormikProps<T>;
    loadOptions: LoadOptions<
        SelectOption,
        any,
        Additional
    >;
    placeholder?: string;
    required?: boolean;
    isMulti?: boolean;
    cacheUniqs?: unknown[];
    isDisabled?: boolean;
};

export const AsyncPaginateField = <T extends Record<string, any>,>(
    {
        label,
        name,
        formik,
        loadOptions,
        placeholder,
        required = false,
        isMulti = false,
        cacheUniqs = [],
        isDisabled = false,
    }: Props<T>
) => {
    const tForm = useTranslations('Form');
    const formikContext = useFormikContext<T>();
    const f = formik ?? formikContext;
    const value = f.values[name as string];

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
                            <span>
                                {' '}
                                ({tForm('fields.optional')})
                            </span>
                    }
                </Form.Label>
            }

            <AsyncPaginate<
                    SelectOption,
                    any,
                    Additional,
                    boolean
                >
                value={value}
                isMulti={isMulti}
                loadOptions={loadOptions}
                additional={{
                    page: 1,
                }}
                debounceTimeout={300}
                cacheUniqs={cacheUniqs}
                placeholder={placeholder}
                isDisabled={isDisabled}
                isClearable
                isSearchable
                onChange={(selected) => {
                    if (isMulti) {
                        f.setFieldValue(
                            name as string,
                            selected ?? []
                        );
                    } else {
                        f.setFieldValue(
                            name as string,
                            selected ?? null
                        );
                    }
                }}
                onBlur={() => {
                    f.setFieldTouched(
                        name as string,
                        true
                    );
                }}
            />

            {
                f.touched[name as string] &&
                f.errors[name as string] &&
                (
                    <div className="invalid-feedback d-block">
                        {String(
                            f.errors[name as string]
                        )}
                    </div>
                )
            }
        </Form.Group>
    );
};