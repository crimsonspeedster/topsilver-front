import Header from "@src/components/Headers/Header";
import FooterPage from "@src/components/Footer";
import RegisterForm from "@src/components/RegisterForm";
import HeadTitle from "@src/commonsections/HeadTitle";
import { getTranslations } from 'next-intl/server';
import {redirect} from "next/navigation";
import {getUserSSR} from "@lib/auth/getUser.server";
import React from "react";

const Register = async () => {
    const t = await getTranslations('Common');
    const user = await getUserSSR();

    if (user) {
        redirect('/');
    }

    return (
        <>
            <HeadTitle
                title={t('registration')}
            />

            <Header />

            <main>
                <section className="py-5">
                    <div className="container">
                        <div className="col-md-6 mx-auto">
                            <h1 className="fw-bold text-center">{t('registration')}</h1>

                            <RegisterForm />
                        </div>
                    </div>
                </section>
            </main>

            <FooterPage />
        </>
    );
}

export default Register;