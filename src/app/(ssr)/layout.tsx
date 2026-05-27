import {LayoutProps} from "@interfaces/common/layouts";
import AuthProvider from "@src/providers/AuthProvider";
import {getUserSSR} from "@lib/auth/getUser.server";
import {getCartSSR} from "@lib/getCart.server";
import CartProvider from "@src/providers/CartProvider";


export default async function Layout (
    {
        children,
    }: LayoutProps
) {
    const user = await getUserSSR();
    const cartData = await getCartSSR();

    return (
        <AuthProvider
            initialUser={user}
        >
            <CartProvider
                initialCart={cartData}
            >
                {children}
            </CartProvider>
        </AuthProvider>
    );
}