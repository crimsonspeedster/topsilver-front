'use client';

import SelectField from "@src/components/Form/SelectField";
import React, {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import axiosClient from "@lib/axiosClient";
import {SelectOption} from "@interfaces/layouts/formField";
import {AxiosResponse} from "axios";
import {NPAreaObject, NPCityObject, NPWarehouseObject} from "@interfaces/entities/np";
import {useFormikContext} from "formik";
import {CheckoutFormValues} from "@interfaces/layouts/checkoutForm";
import {AsyncPaginateField} from "@src/components/Form/AsyncPaginateField";
import {PaginationObject} from "@interfaces/common";


const NPWarehouse = () => {
    const tCheckout = useTranslations('Checkout');
    const {values, setFieldValue} = useFormikContext<CheckoutFormValues>();
    const selectedArea = values.np_area;
    const selectedCity = values.np_city;

    const [areas, setAreas] = useState<SelectOption[]>([]);

    useEffect(() => {
        axiosClient.get('/nova-poshta/areas')
            .then((res: AxiosResponse<{data: NPAreaObject[]}>) => {
                setAreas(res.data.data.map(item => ({
                    label: item.name,
                    value: item.ref
                })));
            })
            .catch((error) => {

            });
    }, []);

    useEffect(() => {
        setFieldValue('np_city', null);
        setFieldValue('np_warehouse', null);
    }, [values.np_area]);

    useEffect(() => {
        setFieldValue('np_warehouse', null);
    }, [values.np_city]);

    return (
        <>
            <h3 className="mb-3">{tCheckout('enter_delivery_address')}</h3>

            <SelectField
                name="np_area"
                label={tCheckout('select_area')}
                options={areas}
                required={true}
            />

            <AsyncPaginateField<CheckoutFormValues>
                name="np_city"
                label={tCheckout('select_locality')}
                required={true}
                cacheUniqs={[selectedArea]}
                isDisabled={!selectedArea}
                loadOptions={async (
                    search,
                    loadedOptions,
                    additional
                ) => {
                    const { page = 1 } = additional ?? {};

                    if (!selectedArea) {
                        return {
                            options: [],
                            hasMore: false,
                            additional: {
                                page: 1,
                            },
                        };
                    }

                    const res:AxiosResponse<{data: {cities: NPCityObject[], pagination: PaginationObject}}> = await axiosClient.get(
                        `/nova-poshta/areas/${selectedArea}/cities`,
                        {
                            params: {
                                search,
                                page,
                            },
                        }
                    );

                    return {
                        options: res.data.data.cities.map(
                            (item: NPCityObject) => ({
                                label: item.name,
                                value: item.ref,
                            })
                        ),
                        hasMore: res.data.data.pagination.has_more_pages,
                        additional: {
                            page: page + 1,
                        },
                    };
                }}
            />

            <AsyncPaginateField<CheckoutFormValues>
                name="np_warehouse"
                label={tCheckout('select_warehouse')}
                required={true}
                cacheUniqs={[selectedCity]}
                isDisabled={!selectedCity}
                loadOptions={async (
                    search,
                    loadedOptions,
                    additional
                ) => {
                    const { page = 1 } = additional ?? {};

                    if (!selectedCity) {
                        return {
                            options: [],
                            hasMore: false,
                            additional: {
                                page: 1,
                            },
                        };
                    }

                    const res:AxiosResponse<{data: {warehouses: NPWarehouseObject[], pagination: PaginationObject}}> = await axiosClient.get(
                        `/nova-poshta/cities/${selectedCity.value}/warehouses`,
                        {
                            params: {
                                search,
                                page,
                            },
                        }
                    );

                    return {
                        options: res.data.data.warehouses.map(
                            (item: NPWarehouseObject) => ({
                                label: item.name,
                                value: item.ref,
                            })
                        ),
                        hasMore: res.data.data.pagination.has_more_pages,
                        additional: {
                            page: page + 1,
                        },
                    };
                }}
            />
        </>
    );
}

export default NPWarehouse;