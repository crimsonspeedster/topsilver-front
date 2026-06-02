import {LayoutProps} from "@interfaces/common/layouts";
import AuthProvider from "@src/providers/AuthProvider";
import CartProvider from "@src/providers/CartProvider";
import WishlistProvider from "@src/providers/WishlistProvider";

export default function Layout (
    {
        children,
    }: LayoutProps
) {
    return (
        <AuthProvider>
            <CartProvider>
                <WishlistProvider>
                    {children}
                </WishlistProvider>
            </CartProvider>
        </AuthProvider>
    );
}