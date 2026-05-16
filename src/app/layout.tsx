import "@assets/scss/bootstrap.scss";
import "@assets/scss/app.scss";
import "@assets/icons/font-icon.css";
import {NextIntlClientProvider} from "next-intl";
import {LayoutProps} from "@interfaces/common/layouts";
import Header from "@src/components/Headers/Header";
import FooterPage from "@src/components/Footer";
import {Metadata} from "next";
import ProductPopups from "@src/components/Product/ProductPopups";
import {ToastContainer} from "react-toastify";


export function generateViewport(): Record<string, string | number> {
    return {
        width: "device-width",
        initialScale: 1,
        userScalable: "no",
    };
}

export const metadata: Metadata = {
    title: {
        default: "TopSilver",
        template: "%s | TopSilver",
    },
    description: "Магазин TopSilver",
};

export default function Layout({children}: LayoutProps) {
    return (
        <html lang="uk">
            <body>
                <NextIntlClientProvider>
                    <Header />

                    <main>
                        {children}
                    </main>

                    <ProductPopups />

                    <FooterPage />

                    <ToastContainer
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick={true}
                        pauseOnHover={true}
                        position="top-right"
                    />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
