import {getUserOrdersSSR} from "@lib/auth/getUser.server";
import OrdersTemplate from "@templates/OrdersTemplate";
import {Metadata} from "next";
import {notFound} from "next/navigation";


export default async function Orders () {
    const orders = await getUserOrdersSSR({
        page: 1,
    });

    if (!orders) {
        notFound();
    }

    return (
        <OrdersTemplate
            orders={orders.orders}
            initialPage={1}
            slug="dashboard/orders"
            pagination={orders.pagination}
        />
    );
}

export const metadata: Metadata = {
    title: 'Мої замовлення',
    description: 'Історія та статуси замовлень',
    robots: {
        index: false,
        follow: false,
    },
};