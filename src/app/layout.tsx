import "@assets/scss/bootstrap.scss";
import "@assets/scss/app.scss";
import "@assets/icons/font-icon.css";
import {NextIntlClientProvider} from "next-intl";
import {LayoutProps} from "@interfaces/common/layouts";
import FooterPage from "@src/components/Footer";
import {Metadata} from "next";
import ProductPopups from "@src/components/Product/ProductPopups";
import {ToastContainer} from "react-toastify";
import {getMenusSSR} from "@lib/getMenus.server";
import LayoutHeader4 from "@src/components/Headers/LayoutHeader4";
import logo from '@assets/images/svg/kalles.svg'


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

export default async function Layout({children}: LayoutProps) {
    const menus = await getMenusSSR();

    const headerMenu = menus.find(item => item.location.name === 'header');
    const mobileMenu = menus.find(item => item.location.name === 'mobile');
    const topBannerText = "test text test";
    const logoImageLink = logo;

    return (
        <html lang="uk">
            <body>
                <NextIntlClientProvider>
                    <LayoutHeader4
                        logo={logoImageLink}
                        topBanner={topBannerText}
                        headerMenu={headerMenu}
                        mobileMenu={mobileMenu ?? headerMenu}
                    />

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
