'use client';

import {MenuItemObject} from "@interfaces/entities/menu";
import {useState} from "react";
import Link from "next/link";


type Props = {
    item: MenuItemObject;
};

const MobileMenuItem = (
    {
        item,
    }: Props
) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleClick = () => {
        setIsOpen(val => !val);
    };

    if (item.children && item.children.length > 0) {
        return (
            <div className="accordion-item">
                <div className="accordion-header">
                    <button
                        className={`accordion-button ${!isOpen ? 'collapsed' : ''}`}
                        onClick={handleClick}
                    >
                        {
                            item.title
                        }
                    </button>
                </div>

                <div
                    className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
                >
                    <ul className="accordion-nav-list list-unstyled mb-0">
                        {
                            item.children.map((item, index) => (
                                <MobileMenuItem
                                    key={index}
                                    item={item}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        );
    }

    if (item.type === 'custom') {
        return (
            <li>
                <a
                    className="pill-item col-6 p-0 nav-link"
                    href={item.url}
                >
                    {item.title}
                </a>
            </li>
        );
    }

    return (
        <li>
            <Link
                className="pill-item col-6 p-0 nav-link"
                href={item.url}
            >
                {item.title}
            </Link>
        </li>
    );
}

export default MobileMenuItem;