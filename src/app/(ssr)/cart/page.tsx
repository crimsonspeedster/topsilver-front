import {Metadata} from "next";
import CartPageSection from "@src/commonsections/CartPageSection";
import {getUserBonusesSSR} from "@lib/auth/getUser.server";


export default async function CartPage() {
    const bonusesData = await getUserBonusesSSR();

    return (
        <CartPageSection
            bonuses={bonusesData}
        />
    );
}

export const metadata: Metadata = {
    title: 'Кошик',
    description: 'Ваш кошик товарів.',
    robots: {
        index: false,
        follow: false,
    },
};