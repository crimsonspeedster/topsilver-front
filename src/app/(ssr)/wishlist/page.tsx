import {Metadata} from "next";
import WishListClient from "@src/components/WishListClient";
import {getWishlistSSR} from "@lib/getWishlistSSR.server";


const WishListPage = async () => {
    const wishlistData = await getWishlistSSR();

    return (
        <WishListClient
            wishList={wishlistData}
        />
    );
}

export default WishListPage;

export const metadata: Metadata = {
    title: 'Список бажань',
    description: 'Список бажань',
    robots: {
        index: false,
        follow: false,
    },
};