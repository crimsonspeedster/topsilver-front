import {useTranslations} from "next-intl";
import CheckoutOverhead from "@src/components/Checkout/CheckoutOverhead";
import React from "react";


const ShippingInfo = () => {
    const tCheckout = useTranslations('Checkout');

    return (
        <>
            <CheckoutOverhead
                num={2}
                title={tCheckout('shipping_overhead')}
            />
        </>
    );
}

export default ShippingInfo;