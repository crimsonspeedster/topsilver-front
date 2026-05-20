import {Metadata} from "next";
import WishListClient from "@src/components/WishListClient";


const WishListPage = async () => {
    return (
        <WishListClient />
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