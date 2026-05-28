'use client';

import {MenuObject} from "@interfaces/entities/menu";
import {useState} from "react";
import Link from "next/link";


type Props = {
    menu: MenuObject;
};

const FooterMenu = (
    {
        menu,
    }: Props
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = () => {
        setIsOpen(val => !val);
    }

    return (
        <div className="col-md-3 col-lg-2 mb-2 accordion-item footer-accordion-item">
            <button
                className={`accordion-button footer-accordion-button px-0  ${!isOpen ? 'collapsed' : ''}`}
                onClick={handleClick}
            >
                <h5>{menu.name}</h5>
            </button>

            <h5 className="fw-medium d-none d-md-block">{menu.name}</h5>

            <div className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}>
                <div className="mt-md-4 pt-md-2">
                    <ul className="menu list-unstyled">
                        {
                            menu.items.map((item, index) => (
                                <li
                                    key={index}
                                    className="menu-item"
                                >
                                    {
                                        item.type === 'custom' ?
                                            <a
                                                className="text-muted"
                                                href={item.url}
                                            >
                                                {item.title}
                                            </a>
                                            :
                                            <Link
                                                href={item.url}
                                                className="text-muted"
                                            >
                                                {item.title}
                                            </Link>
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FooterMenu;