import {LayoutProps} from "@interfaces/common/layouts";
import AuthProvider from "@src/providers/AuthProvider";
import {getUserSSR} from "@lib/auth/getUser.server";
import {getCartSSR} from "@lib/getCart.server";
import CartProvider from "@src/providers/CartProvider";
import {getWishlistSSR} from "@lib/getWishlistSSR.server";
import WishlistProvider from "@src/providers/WishlistProvider";


export default async function Layout (
    {
        children,
    }: LayoutProps
) {
    const user = await getUserSSR();
    const cartData = await getCartSSR();
    const wishlistData = await getWishlistSSR();

    return (
        <AuthProvider
            initialUser={user}
        >
            <CartProvider
                initialCart={cartData}
            >
                <WishlistProvider
                    initialWishlist={wishlistData}
                >
                    {children}
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}