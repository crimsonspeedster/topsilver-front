import {Metadata} from "next";
import CartPageSection from "@src/commonsections/CartPageSection";
import {getUserBonusesSSR} from "@lib/auth/getUser.server";
import {getSettingsSSR} from "@lib/getSettings.server";
import {searchSettingByKey} from "@src/helpers";
import {getCartSSR} from "@lib/getCart.server";


export default async function CartPage() {
    const bonusesData = await getUserBonusesSSR();
    const settingsData = await getSettingsSSR();
    const cartData = await getCartSSR();

    const bannerFromSettings = searchSettingByKey('cart_banner', settingsData);
    const freeShippingFromSettings = searchSettingByKey('free_shipping', settingsData);

    return (
        <CartPageSection
            cart={cartData}
            bonuses={bonusesData}
            free_shipping={freeShippingFromSettings ? freeShippingFromSettings as number : null}
            banner={
                bannerFromSettings ? {
                    url: bannerFromSettings as string,
                    id: 1,
                }
                : null
            }
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