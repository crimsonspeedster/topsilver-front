'use client';

import React, {useEffect, useState} from "react";
import {ShopsPickupObject} from "@interfaces/entities/shops";
import axiosClient from "@lib/axiosClient";
import {AxiosResponse} from "axios";
import SelectField from "@src/components/Form/SelectField";
import {useTranslations} from "next-intl";
import {SelectGroup} from "@interfaces/layouts/formField";
import {groupShopsByRegion} from "@src/helpers";


const LocalPickup = () => {
    const tCheckout = useTranslations('Checkout');

    const [groupedShops, setGroupedShops] = useState<SelectGroup[]>([]);

    useEffect(() => {
        axiosClient.get('reference/shops-pickup/')
            .then(function (res: AxiosResponse<{data: ShopsPickupObject[]}>) {
                setGroupedShops(groupShopsByRegion(res.data.data));
            })
            .catch(function (error) {
                setGroupedShops([]);
            });
    }, []);

    return (
        <SelectField
            label={tCheckout('select_shop')}
            name="shop_id"
            options={groupedShops}
            required={true}
        />
    );
}

export default LocalPickup;