"use client";

import { useState } from 'react';
import LoginModal from '@src/components/Headers/LoginModal';
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal';
import { usePathname } from 'next/navigation';
import MobileHeader from '@src/components/Headers/MobileHeader';
import SearchModal from "@src/components/Headers/SearchModal";
import SearchBadge from "@src/components/Badges/SearchBadge";
import LoginBadge from "@src/components/Badges/LoginBadge";
import WishListBadge from "@src/components/Badges/WishListBadge";
import CartBadge from "@src/components/Badges/CartBadge";
import TopBanner from "@src/components/Headers/TopBanner";
import {MenuObject} from "@interfaces/entities/menu";
import HeaderMenu from "@src/components/Headers/HeaderMenu";
import LogoBlock from "@src/components/Headers/LogoBlock";
import SocialNav from "@src/components/Headers/SocialNav";
import {SocialLinkObject} from "@interfaces/entities/settings";


type Props = {
    headerMenu?: MenuObject | null;
    mobileMenu?: MenuObject | null;
    topBanner?: string;
    logo: string;
    socialLinks?: SocialLinkObject[];
};

const LayoutHeader4 = (
    {
        headerMenu,
        mobileMenu,
        topBanner,
        logo,
        socialLinks,
    }: Props
) => {
    const pathname = usePathname();

    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
    const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
    const [showCartModal, setShowCartModal] = useState<boolean>(false);

    const handleMobileMenu = (isOpened: boolean) => {
        setShowMobileMenu(isOpened);
    }

    const handleSearchModal = (isOpened: boolean) => {
        setShowSearchModal(isOpened);
    }

    const handleLoginModal = (isOpened: boolean) => {
        setShowLoginModal(isOpened);
    }

    const handleShowCartModal = (isOpened: boolean) => {
        setShowCartModal(isOpened);
    }

    return (
        <>
            {
                topBanner &&
                <TopBanner
                    description={topBanner}
                />
            }

            <header className="header header-sticky">
                <nav className="navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center">
                    <div className="container-fluid">
                        {
                            headerMenu &&
                            <button
                                className="d-lg-none btn p-0"
                                onClick={()=>handleMobileMenu(true)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 30 16">
                                    <rect width="30" height="1.5" />
                                    <rect y="7" width="20" height="1.5" />
                                    <rect y="14" width="30" height="1.5" />
                                </svg>
                            </button>
                        }

                        <LogoBlock
                            className="navbar-brand nav-link me-0 d-lg-none"
                            logo={logo}
                        />

                        <div className="topbar-toolbar d-flex align-items-center gap-2 gap-md-3 d-lg-none">
                            <SearchBadge
                                handleClick={()=>handleSearchModal(true)}
                            />

                            <LoginBadge
                                handleClick={()=>handleLoginModal(true)}
                            />

                            <WishListBadge />

                            <CartBadge
                                isLink={true}
                                handleClick={()=>handleShowCartModal(true)}
                            />
                        </div>

                        <div className="collapse navbar-collapse">
                            <div className="w-100">
                                <div className="d-none d-lg-flex justify-content-between position-relative align-items-center py-3 border-bottom">
                                    {
                                        socialLinks && socialLinks.length > 0 &&
                                        <SocialNav
                                            className="nt-social"
                                            links={socialLinks}
                                        />
                                    }

                                    <LogoBlock
                                        className="nav-link position-absolute z-1 top-50 start-50 translate-middle"
                                        logo={logo}
                                    />

                                    <div className="topbar-toolbar d-flex ms-auto align-items-center gap-3">
                                        <SearchBadge
                                            handleClick={()=>handleSearchModal(true)}
                                        />

                                        <LoginBadge
                                            handleClick={()=>handleLoginModal(true)}
                                        />

                                        <WishListBadge />

                                        <CartBadge
                                            isLink={(pathname === '/cart' || pathname === '/checkout')}
                                            handleClick={()=>handleShowCartModal(true)}
                                        />
                                    </div>
                                </div>

                                {
                                    headerMenu &&
                                    <div className="d-none d-lg-block mx-auto w-100">
                                        <HeaderMenu
                                            menu={headerMenu}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <SearchModal
                show={showSearchModal}
                handleClose={()=>handleSearchModal(false)}
            />

            <LoginModal
                loginShow={showLoginModal}
                handleLoginClose={()=>handleLoginModal(false)}
            />

            <ShoppingCardModal
                shoppingShow={showCartModal}
                handleShoppingClose={()=>handleShowCartModal(false)}
            />

            {
                mobileMenu &&
                <MobileHeader
                    menu={mobileMenu}
                    mobileMenuShow={showMobileMenu}
                    handleMobileMenuClose={()=>handleMobileMenu(false)}
                />
            }
        </>
    );
}

export default LayoutHeader4;