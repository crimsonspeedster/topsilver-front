"use client";

import CouponForm from "@src/components/Coupon/CouponForm";
import {useTranslations} from "next-intl";
import Coupons from "@src/components/Coupon/Coupons";


const CouponSection = () => {
    const tCart = useTranslations('Cart');

    return (
        <div>
            <h6>{tCart('coupons')}:</h6>

            <CouponForm />

            <Coupons />
        </div>
    );
}

export default CouponSection;