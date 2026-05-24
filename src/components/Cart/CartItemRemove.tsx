import {useCartStore} from "@src/store/cart-store";
import axiosClient from "@lib/axiosClient";
import {toast} from "react-toastify";
import {useTranslations} from "next-intl";

type Props = {
    id: number
};

const CartItemRemove = (
    {
        id,
    }: Props
) => {
    const tCart = useTranslations('Cart');
    const hydrateCart = useCartStore((state) => state.hydrate);

    const handleRemove = async () => {
        try {
            const res = await axiosClient.delete(`/cart/items/${id}`);

            hydrateCart(res.data.data);

            toast.success(tCart('item_removed'));
        } catch (error) {

        }
    }

    return (
        <button
            onClick={handleRemove}
            className="btn p-0"
        >
            <svg
                width="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
        </button>
    );
}

export default CartItemRemove;