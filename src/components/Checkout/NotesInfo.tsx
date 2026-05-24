import {useTranslations} from "next-intl";
import CheckoutOverhead from "@src/components/Checkout/CheckoutOverhead";
import React from "react";
import TextareaField from "@src/components/Form/TextareaField";

const NotesInfo = () => {
    const tCheckout = useTranslations('Checkout');

    return (
        <div className="mt-3">
            <CheckoutOverhead
                title={tCheckout('additional_overhead')}
            />

            <TextareaField
                label={tCheckout('notes')}
                name="notes"
                required={false}
                rows={6}
            />
        </div>
    );
}

export default NotesInfo;