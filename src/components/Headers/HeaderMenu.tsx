import Link from "next/link";
import {MenuObject} from "@interfaces/entities/menu";
import {useState} from "react";
import HeaderMenuItem from "@src/components/Headers/HeaderMenuItem";


type Props = {
    menu: MenuObject;
};

const HeaderMenu = (
    {
       menu,
    }: Props
) => {
    return (
        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 justify-content-center">
            {
                menu.items.map((item, index) => (
                    <HeaderMenuItem
                        key={index}
                        item={item}
                    />
                ))
            }
        </ul>
    );
}

export default HeaderMenu;