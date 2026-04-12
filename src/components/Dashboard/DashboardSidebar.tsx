import Link from 'next/link';
import { FaUser, FaBox, FaGift } from 'react-icons/fa';

export default function DashboardSidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar__logo">Dashboard</div>

            <nav>
                <ul>
                    <li>
                        <Link href="/dashboard/profile">
                            <FaUser /> Profile
                        </Link>
                    </li>

                    <li>
                        <Link href="/dashboard/orders">
                            <FaBox /> Orders
                        </Link>
                    </li>

                    <li>
                        <Link href="/dashboard/bonuses">
                            <FaGift /> Bonuses
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}