import {useCartStore} from "@src/store/cart-store";
import Link from "next/link";


type Props = {
    isLink: boolean,
    handleClick: () => void,
};

const CartBadge = (
    {
        isLink,
        handleClick,
    }: Props
) => {
    const cart = useCartStore(state => state.cart);

    if (isLink) {
        return (
            <Link
                className="btn p-0"
                href="/cart"
            >
                <i className="iccl iccl-cart" />

                <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">{cart.total_qty}</span>
            </Link>
        );
    }

    return (
        <button
            onClick={handleClick}
            className="btn p-0"
        >
            <i className="iccl iccl-cart" />

            <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">{cart.total_qty}</span>
        </button>
    );
}

export default CartBadge;