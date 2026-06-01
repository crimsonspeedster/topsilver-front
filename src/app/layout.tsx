import "@assets/scss/bootstrap.scss";
import "@assets/scss/app.scss";
import "@assets/icons/font-icon.css";
import {NextIntlClientProvider} from "next-intl";
import {LayoutProps} from "@interfaces/common/layouts";
import {Metadata} from "next";
import ProductPopups from "@src/components/Product/ProductPopups";
import {ToastContainer} from "react-toastify";
import {getMenusSSR} from "@lib/getMenus.server";
import LayoutHeader4 from "@src/components/Headers/LayoutHeader4";
import LogoPlaceholder from '@assets/images/svg/kalles.svg';
import FooterLingeries from "@src/components/FooterLingeries";
import {getSettingsSSR} from "@lib/getSettings.server";
import {searchSettingByKey} from "@src/helpers";
import {SocialLinkItemLayoutObject} from "@interfaces/entities/blocks/social-link-item";
import {ContactItemLinkLayoutObject, ContactItemTextLayoutObject} from "@interfaces/entities/blocks/contact-item";


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
    const settingsData = await getSettingsSSR();

    const footerMenuFirst = menus.find(item => item.location.name === 'footer_first');
    const footerMenuSecond = menus.find(item => item.location.name === 'footer_second');
    const footerMenuThird = menus.find(item => item.location.name === 'footer_third');
    const headerMenu = menus.find(item => item.location.name === 'header');
    const mobileMenu = menus.find(item => item.location.name === 'mobile');

    const logoFromSettings = searchSettingByKey('logo', settingsData);
    const topBannerFromSettings = searchSettingByKey('top_banner_text', settingsData);
    const subscribeDescriptionFromSettings = searchSettingByKey('subscribe_text', settingsData);
    const socialLinksFrontSettings = searchSettingByKey('social_links', settingsData);
    const contactsFrontSettings = searchSettingByKey('contacts', settingsData);

    return (
        <html lang="uk">
            <body>
                <NextIntlClientProvider>
                    <LayoutHeader4
                        logo={logoFromSettings ?? LogoPlaceholder}
                        topBanner={topBannerFromSettings ? topBannerFromSettings as string : undefined}
                        headerMenu={headerMenu}
                        mobileMenu={mobileMenu ?? headerMenu}
                        socialLinks={socialLinksFrontSettings ? socialLinksFrontSettings as SocialLinkItemLayoutObject[] : undefined}
                    />

                    <main>
                        {children}
                    </main>

                    <ProductPopups />

                    <FooterLingeries
                        contacts={contactsFrontSettings as (ContactItemTextLayoutObject | ContactItemLinkLayoutObject)[]}
                        logo={logoFromSettings ?? LogoPlaceholder}
                        socialLinks={socialLinksFrontSettings ? socialLinksFrontSettings as SocialLinkItemLayoutObject[] : undefined}
                        footerMenuFirst={footerMenuFirst}
                        footerMenuSecond={footerMenuSecond}
                        footerMenuThird={footerMenuThird}
                        subscribeDescription={subscribeDescriptionFromSettings ? subscribeDescriptionFromSettings as string : undefined}
                    />

                    <ToastContainer
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick={true}
                        pauseOnHover={true}
                        position="top-right"
                    />

                    <div
                        className="backdrop-shadow d-none"
                    />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
