"use client";

import Link from 'next/link';
import { FaUser, FaBox, FaGift, FaRightFromBracket } from 'react-icons/fa6';
import {useTranslations} from "next-intl";
import {usePathname, useRouter} from 'next/navigation';
import Cookies from 'js-cookie';
import axios from "axios";
import axiosClient from "@lib/axiosClient";
import {useAuthStore} from "@src/store/client-store";


export default function DashboardSidebar() {
    const tDashboard = useTranslations('Dashboard');
    const pathname = usePathname();
    const router = useRouter();
    const logout = useAuthStore((state) => state.clearUser);

    const logOut = async () => {
        const res = await axiosClient.post('/logout');

        if (res.status === 200) {
            logout();
            router.replace('/');
        }
    }

    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link
                            href="/dashboard/profile"
                            className={
                                pathname === '/dashboard/profile'
                                    ? 'active'
                                    : ''
                            }
                        >
                            <FaUser /> {tDashboard('profile')}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/orders"
                            className={
                                pathname === '/dashboard/orders' ||
                                pathname.startsWith('/dashboard/orders/page/')
                                    ? 'active'
                                    : ''
                            }
                        >
                            <FaBox /> {tDashboard('orders')}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/quick-orders"
                            className={
                                pathname === '/dashboard/quick-orders' ||
                                pathname.startsWith('/dashboard/quick-orders/page/')
                                    ? 'active'
                                    : ''
                            }
                        >
                            <FaBox /> {tDashboard('quick_orders')}
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/dashboard/bonuses"
                            className={
                                pathname === '/dashboard/bonuses'
                                    ? 'active'
                                    : ''
                            }
                        >
                            <FaGift /> {tDashboard('bonuses')}
                        </Link>
                    </li>

                    <li>
                        <button
                            className="btn"
                            onClick={logOut}
                        >
                            <FaRightFromBracket /> {tDashboard('logout')}
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}