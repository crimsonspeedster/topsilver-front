import CheckoutOverhead from "@src/components/Checkout/CheckoutOverhead";
import {useTranslations} from "next-intl";
import React from "react";
import FormField from "@src/components/Form/FormField";
import PhoneFormField from "@src/components/Form/PhoneFormField";

const PersonalInfo = () => {
    const tCheckout = useTranslations('Checkout');
    const tAuth = useTranslations('Auth');

    return (
        <>
            <CheckoutOverhead
                num={1}
                title={tCheckout('personal_data_overhead')}
            />

            <div className="row">
                <div className="col-md-6">
                    <FormField
                        label={tAuth('name')}
                        name="first_name"
                        required={true}
                        type="text"
                    />
                </div>

                <div className="col-md-6">
                    <FormField
                        label={tAuth('surname')}
                        name="last_name"
                        required={true}
                        type="text"
                    />
                </div>

                <div className="col-md-6">
                    <FormField
                        label={tAuth('middleName')}
                        name="middle_name"
                        required={false}
                        type="text"
                    />
                </div>

                <div className="col-md-6">
                    <FormField
                        label={tAuth('email')}
                        name="email"
                        required={false}
                        type="email"
                    />
                </div>

                <PhoneFormField
                    label={tAuth('phone')}
                    name="phone"
                    required={true}
                />
            </div>
        </>
    );
}

export default PersonalInfo;