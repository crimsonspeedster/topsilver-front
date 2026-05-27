import {Metadata} from "next";
import {getCartSSR} from "@lib/getCart.server";
import {redirect} from "next/navigation";
import PageBanner from "@src/commonsections/PageBanner";
import {getTranslations} from "next-intl/server";
import CheckoutForm from "@src/components/Checkout/CheckoutForm";
import {getPaymentMethods} from "@lib/getPaymentMethods.server";
import {getShippingMethods} from "@lib/getShippingMethods.server";
import {getUserSSR} from "@lib/auth/getUser.server";


const CheckoutPage = async () => {
    const tCheckout = await getTranslations('Checkout');
    const cartData = await getCartSSR();

    if (cartData.total_qty === 0) {
        redirect('/cart');
    }

    const paymentMethods = await getPaymentMethods();
    const shippingMethods = await getShippingMethods();
    const userData = await getUserSSR();

    return (
        <>
            <PageBanner
                title={tCheckout('checkout')}
                header_tag={"h1"}
            />

            <CheckoutForm
                cart={cartData}
                paymentMethods={paymentMethods}
                shippingMethods={shippingMethods}
                initUserData={userData}
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