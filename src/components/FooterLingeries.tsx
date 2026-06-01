"use client";

import {MenuObject} from "@interfaces/entities/menu";
import ButtonUp from "@src/components/Footer/ButtonUp";
import LogoBlock from "@src/components/Headers/LogoBlock";
import SocialNav from "@src/components/Headers/SocialNav";
import ContactsNav from "@src/components/Footer/ContactsNav";
import Subscribe from "@src/components/Footer/Subscribe";
import FooterMenu from "@src/components/Footer/FooterMenu";
import {SocialLinkItemLayoutObject} from "@interfaces/entities/blocks/social-link-item";
import {ContactItemLinkLayoutObject, ContactItemTextLayoutObject} from "@interfaces/entities/blocks/contact-item";


type Props = {
    footerMenuFirst?: MenuObject;
    footerMenuSecond?: MenuObject;
    footerMenuThird?: MenuObject;
    logo: string;
    socialLinks?: SocialLinkItemLayoutObject[];
    contacts?: (ContactItemTextLayoutObject | ContactItemLinkLayoutObject)[];
    subscribeDescription?: string | null;
};

const FooterLingeries = (
    {
        footerMenuFirst,
        footerMenuSecond,
        footerMenuThird,
        logo,
        socialLinks,
        contacts,
        subscribeDescription,
    }: Props
) => {
    return (
        <>
            <footer className="footer footer-lingerie">
                <div className="container">
                    <div
                        className="accordion row"
                        id="footer-accordion"
                    >
                        <div className="col-md-4 col-lg-3 mb-2 footer-accordion-item">
                            <LogoBlock
                                logo={logo}
                            />

                            {
                                (
                                    (socialLinks && socialLinks.length > 0)
                                    ||
                                    (contacts && contacts.length > 0)
                                ) &&
                                <div className="mt-4 pt-2">
                                    {
                                        contacts && contacts.length > 0 &&
                                        <ContactsNav
                                            contacts={contacts}
                                        />
                                    }

                                    {
                                        socialLinks && socialLinks.length > 0 &&
                                        <SocialNav
                                            className="footer-social d-flex align-items-center gap-2 mt-4"
                                            links={socialLinks}
                                        />
                                    }
                                </div>
                            }
                        </div>

                        {
                            footerMenuFirst &&
                            <FooterMenu
                                menu={footerMenuFirst}
                            />
                        }

                        {
                            footerMenuSecond &&
                            <FooterMenu
                                menu={footerMenuSecond}
                            />
                        }

                        {
                            footerMenuThird &&
                            <FooterMenu
                                menu={footerMenuThird}
                            />
                        }

                        <Subscribe
                            description={subscribeDescription}
                        />
                    </div>
                </div>
            </footer>

            <ButtonUp />
        </>
    );
}

export default FooterLingeries;