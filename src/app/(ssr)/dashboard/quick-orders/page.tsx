import {getUserQuickOrdersSSR} from "@lib/auth/getUser.server";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import QuickOrdersTemplate from "@templates/QuickOrdersTemplate";

export default async function QuickOrders() {
    const quickOrders = await getUserQuickOrdersSSR({
        page: 1,
    });

    if (!quickOrders) {
        notFound();
    }

    return (
        <QuickOrdersTemplate
            orders={quickOrders.orders}
            initialPage={1}
            slug="dashboard/quick-orders"
            pagination={quickOrders.pagination}
        />
    );
}

export const metadata: Metadata = {
    title: 'Мої швидкі замовлення',
    description: 'Історія та статуси швидких замовлень',
    robots: {
        index: false,
        follow: false,
    },
};