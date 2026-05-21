import {Metadata} from "next";
import {getCartSSR} from "@lib/getCart.server";
import {redirect} from "next/navigation";
import PageBanner from "@src/commonsections/PageBanner";
import {getTranslations} from "next-intl/server";
import CheckoutForm from "@src/components/Checkout/CheckoutForm";


const CheckoutPage = async () => {
    const tCheckout = await getTranslations('Checkout');

    const cartData = await getCartSSR();

    // if (cartData.total_qty === 0) {
    //     redirect('/cart');
    // }

    return (
        <>
            <PageBanner
                title={tCheckout('checkout')}
                header_tag={"h1"}
            />

            <CheckoutForm

            />
        </>
    );
}

export default CheckoutPage;

export const metadata: Metadata = {
    title: 'Чекаут',
    description: 'Оформлення замовлення в інтернет магазині. Швидка оплата, доставка та підтвердження замовлення онлайн.',
    robots: {
        index: false,
        follow: false,
    },
};