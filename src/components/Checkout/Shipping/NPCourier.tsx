'use client';

import {useTranslations} from "next-intl";
import {useFormikContext} from "formik";
import {CheckoutFormValues} from "@interfaces/layouts/checkoutForm";
import React, {useEffect} from "react";
import axiosClient from "@lib/axiosClient";
import {NPLocalityObject, NPStreetObject} from "@interfaces/entities/np";
import FormField from "@src/components/Form/FormField";
import {AsyncPaginateField} from "@src/components/Form/AsyncPaginateField";


const NPCourier = () => {
    const tCheckout = useTranslations('Checkout');
    const {values, setFieldValue} = useFormikContext<CheckoutFormValues>();
    const selectedLocality = values.np_locality;

    useEffect(() => {
        setFieldValue('np_street', null);
        setFieldValue('np_house_number', '');
        setFieldValue('np_apartment_number', '');
    }, [values.np_locality]);

    useEffect(() => {
        setFieldValue('np_house_number', '');
        setFieldValue('np_apartment_number', '');
    }, [values.np_street]);

    return (
        <>
            <h3 className="mb-3">{tCheckout('enter_delivery_address')}</h3>

            <AsyncPaginateField<CheckoutFormValues>
                name="np_locality"
                label={tCheckout('select_locality')}
                placeholder={tCheckout('min_3_symbols')}
                required={true}
                cacheUniqs={[]}
                isDisabled={false}
                loadOptions={async (
                    search,
                    loadedOptions,
                    additional
                ) => {
                    try {
                        const res = await axiosClient.get(
                            '/nova-poshta/locality',
                            {
                                params: {
                                    search,
                                },
                            }
                        );

                        const localities: NPLocalityObject[] = res.data.data || [];

                        return {
                            options: localities.map((item) => ({
                                label: `${item.SettlementTypeDescription} ${item.Description}, ${item.AreaDescription}`,
                                value: item.Ref,
                            })),
                            hasMore: false,
                            additional: {
                                page: 1,
                            },
                        };
                    }
                    catch (error) {
                        return {
                            options: [],
                            hasMore: false,
                            additional: {
                                page: 1,
                            },
                        };
                    }
                }}
            />

            <AsyncPaginateField<CheckoutFormValues>
                name="np_street"
                label={tCheckout('select_street')}
                placeholder={tCheckout('min_3_symbols')}
                required={true}
                cacheUniqs={[selectedLocality]}
                isDisabled={!selectedLocality}

                loadOptions={async (
                    search,
                    loadedOptions,
                    additional
                ) => {
                    if (!selectedLocality) {
                        return {
                            options: [],
                            hasMore: false,
                            additional: {
                                page: 1,
                            },
                        };
                    }

                    try {
                        const res = await axiosClient.get(`/nova-poshta/locality/${selectedLocality.value}/streets`, {
                            params: {
                                search,
                            }
                        });

                        const streets = res.data.data?.[0]?.Addresses || [];

                        return {
                            options: streets.map((item: NPStreetObject) => ({
                                label: item.Present,
                                value: item.SettlementStreetRef,
                            })),
                            hasMore: false,
                            additional: {
                                page: 1,
                            },
                        };
                    }
                    catch (error) {
                        return {
                            options: [],
                            hasMore: false,
                            additional: {
                                page: 1,
                            },
                        };
                    }
                }}
            />

            <FormField
                label={tCheckout('select_house')}
                name="np_house_number"
                required={true}
                type="text"
            />

            <FormField
                label={tCheckout('select_apartment')}
                name="np_apartment_number"
                required={false}
                type="text"
            />
        </>
    );
}

export default NPCourier;