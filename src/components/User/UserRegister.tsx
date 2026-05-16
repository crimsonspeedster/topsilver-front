'use client';

import {useTranslations} from "next-intl";
import RegisterForm from "@src/components/RegisterForm";
import {useEffect} from "react";
import axiosClient from "@lib/axiosClient";
import {CityObject} from "@interfaces/entities/city";


type Props = {
    cities: CityObject[];
};

const UserRegister = (
    {
        cities,
    }: Props
) => {
    const tCommon = useTranslations('Common');

    return (
        <section className="py-5">
            <div className="container">
                <div className="col-md-6 mx-auto">
                    <h1 className="fw-bold text-center">{tCommon('registration')}</h1>

                    <RegisterForm
                        cities={cities}
                    />
                </div>
            </div>
        </section>
    );
};

export default UserRegister;