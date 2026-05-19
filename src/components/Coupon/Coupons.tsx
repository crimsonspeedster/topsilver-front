"use client";

import {useCartStore} from "@src/store/cart-store";
import axiosClient from "@lib/axiosClient";
import {toast} from "react-toastify";
import {useTranslations} from "next-intl";


const Coupons = () => {
    const tCart = useTranslations('Cart');
    const cart = useCartStore((state) => state.cart);
    const setCart = useCartStore((state) => state.setCart);

    const removeCouponHandler = async () => {
        try {
            const res = await axiosClient.delete('/cart/coupon');

            setCart(res.data.data);

            toast.success(tCart('coupon_removed'));
        } catch (error) {
            console.log(error);
        }
    }

    if (!cart.coupon)
        return null;

    return (
        <div className="coupons-active__row">
            <div className="coupons-active__item">
                <p className="coupons-active__item-title">{cart.coupon.code}</p>

                <button
                    className="btn-close btn-close-none coupons-active__item-button"
                    onClick={removeCouponHandler}
                >
                    <i className="pe-7s-close pegk" />
                </button>
            </div>
        </div>
    );
}

export default Coupons;