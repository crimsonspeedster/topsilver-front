"use client";

import {  Offcanvas } from "react-bootstrap";
import MobileMenu from "@src/components/Headers/MobileMenu";
import {MenuObject} from "@interfaces/entities/menu";
import mobileMenu from "@src/components/Headers/MobileMenu";


type Props = {
    menu: MenuObject;
    mobileMenuShow: boolean;
    handleMobileMenuClose: () => void;
}

const MobileHeader = (
    {
        menu,
        mobileMenuShow,
        handleMobileMenuClose,
    }: Props
) => {

    return (
        <Offcanvas
            className="header-offcanvas"
            show={mobileMenuShow}
            onHide={handleMobileMenuClose}
            placement="start"
        >
            <button
                className="btn offcanvas-close p-0 text-reset"
                onClick={handleMobileMenuClose}
            >
                <i
                    className="las la-times"
                />
            </button>

            <div className="offcanvas-body p-0">
                <MobileMenu
                    menu={menu}
                />
            </div>
        </Offcanvas>
    );
}
export default MobileHeader;