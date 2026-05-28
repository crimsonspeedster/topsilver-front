import Link from "next/link";
import {useWishlistStore} from "@src/store/wishlist-store";


const WishListBadge = () => {
    const wishList = useWishlistStore(state => state.wishlist);

    return (
        <Link
            className="d-block"
            href="/wishlist"
        >
            <i className="iccl iccl-heart" />

            <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">
                {wishList.length}
            </span>
        </Link>
    );
}

export default WishListBadge;