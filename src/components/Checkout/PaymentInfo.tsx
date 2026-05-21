import {useTranslations} from "next-intl";
import CheckoutOverhead from "@src/components/Checkout/CheckoutOverhead";
import React from "react";


const PaymentInfo = () => {
    const tCheckout = useTranslations('Checkout');

    return (
        <>
            <CheckoutOverhead
                num={3}
                title={tCheckout('payment_overhead')}
            />
        </>
    );
}

export default PaymentInfo;