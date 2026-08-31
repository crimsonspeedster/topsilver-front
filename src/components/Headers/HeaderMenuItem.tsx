'use client';

import {MenuItemObject} from "@interfaces/entities/menu";
import Link from "next/link";
import {useRef, useState, useEffect} from "react";
import { useRouter, usePathname } from 'next/navigation';


type Props = {
    item: MenuItemObject;
};

const HeaderMenuItem = (
    {
        item,
    }: Props
) => {
    const router = useRouter();
    const pathname = usePathname();
    const ref = useRef<HTMLLIElement>(null);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const handleMenuClick = (item: MenuItemObject) => {
        if ((item.children && item.children.length === 0) || !item.children) {
            if (item.type === 'custom') {
                window.location.href = item.url;
            }
            else {
                router.push(item.url);
            }

            return;
        }

        setIsOpened(val => !val);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!ref.current) return;

            if (!ref.current.contains(event.target as Node)) {
                setIsOpened(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setIsOpened(false);
    }, [pathname]);

    return (
        <li
            ref={ref}
            className={`nav-item ${item.children && item.children.length > 0 ? 'dropdown dropdown-mega-lg' : ''}`}
        >
            {
                item.children && item.children.length > 0 ?
                    <span
                        className={`nav-link cursor-pointer ${isOpened ? "active" : ""}`}
                        onClick={(event) => {
                            event.preventDefault();

                            handleMenuClick(item);
                        }}
                    >
                               {item.title}
                    </span>
                    :
                    item.type === 'custom' ?
                        <a
                            className="nav-link"
                            href={item.url}
                            onClick={(event) => {
                                event.preventDefault();

                                handleMenuClick(item);
                            }}
                        >
                            {item.title}
                        </a>
                        :
                        <Link
                            className="nav-link"
                            href={item.url}
                            onClick={(event) => {
                                event.preventDefault();

                                handleMenuClick(item);
                            }}
                        >
                            {item.title}
                        </Link>
            }

            {
                item.children && item.children.length > 0 &&
                <ul className={`dropdown-menu dropdown-sub-column ${isOpened ? "show" : ""}`}>
                    {
                        item.children.map((menuItem, index) => (
                            <HeaderMenuItem
                                key={index}
                                item={menuItem}
                            />
                        ))
                    }
                </ul>
            }
        </li>
    );
}

export default HeaderMenuItem;