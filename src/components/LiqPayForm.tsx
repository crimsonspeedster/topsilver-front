'use client';

import { useEffect, useRef } from 'react';
import {LiqPayProps} from "@interfaces/common/layouts";
import {useTranslations} from "next-intl";


const LiqPayForm = (
    {
        data,
        signature,
        url,
    }: LiqPayProps
) => {
    const tLiqpay = useTranslations('Liqpay');
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            formRef.current?.submit();
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <form
            ref={formRef}
            method="POST"
            action={url}
            className="d-none"
        >
            <input type="hidden" name="data" value={data} />
            <input type="hidden" name="signature" value={signature} />

            <p>{tLiqpay('redirect')}...</p>
        </form>
    );
}

export default LiqPayForm;