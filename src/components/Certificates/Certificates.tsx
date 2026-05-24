"use client";

import {useTranslations} from "next-intl";
import {useCartStore} from "@src/store/cart-store";
import axiosClient from "@lib/axiosClient";
import {toast} from "react-toastify";


const Certificates = () => {
    const tCart = useTranslations('Cart');
    const cart = useCartStore((state) => state.cart);
    const setCart = useCartStore((state) => state.setCart);

    const removeCertificateHandler = async (id: number) => {
        try {
            const res = await axiosClient.delete(`/cart/certificates/${id}`);

            setCart(res.data.data);

            toast.success(tCart('certificate_removed'));
        } catch (error) {

        }
    }

    if (cart.certificates.length === 0)
        return null;

    return (
        <div className="coupons-active__row">
            {
                cart.certificates.map((certificate) => (
                    <div
                        key={certificate.id}
                        className="coupons-active__item"
                    >
                        <p className="coupons-active__item-title">{certificate.code}</p>

                        <button
                            className="btn-close btn-close-none coupons-active__item-button"
                            onClick={()=>{
                                removeCertificateHandler(certificate.id);
                            }}
                        >
                            <i className="pe-7s-close pegk" />
                        </button>
                    </div>
                ))
            }
        </div>
    );
}

export default Certificates;