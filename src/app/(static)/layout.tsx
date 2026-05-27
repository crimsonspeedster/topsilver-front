import {LayoutProps} from "@interfaces/common/layouts";
import AuthProvider from "@src/providers/AuthProvider";
import CartProvider from "@src/providers/CartProvider";

export default function Layout (
    {
        children,
    }: LayoutProps
) {
    return (
        <AuthProvider>
            <CartProvider>
                {children}
            </CartProvider>
        </AuthProvider>
    );
}