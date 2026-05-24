import {useTranslations} from "next-intl";
import {useCartStore} from "@src/store/cart-store";
import axiosClient from "@lib/axiosClient";
import {toast} from "react-toastify";

const Bonuses = () => {
    const tCart = useTranslations('Cart');
    const cart = useCartStore((state) => state.cart);
    const setCart = useCartStore((state) => state.setCart);

    const removeBonusesHandler = async () => {
        try {
            const formData = new FormData();
            formData.append('amount', '0');

            const res = await axiosClient.patch('/cart/bonuses', formData);

            setCart(res.data.data);

            toast.success(tCart('bonuses_removed'));
        } catch (error) {

        }
    }

    if (cart.bonuses_used === 0)
        return null;

    return (
        <div className="coupons-active__row">
            <div className="coupons-active__item">
                <p className="coupons-active__item-title">{cart.bonuses_used}</p>

                <button
                    className="btn-close btn-close-none coupons-active__item-button"
                    onClick={removeBonusesHandler}
                >
                    <i className="pe-7s-close pegk" />
                </button>
            </div>
        </div>
    );
}

export default Bonuses;