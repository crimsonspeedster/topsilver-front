import {getUserOrdersSSR} from "@lib/auth/getUser.server";
import {redirect} from "next/navigation";
import OrdersTemplate from "@templates/OrdersTemplate";
import {Metadata} from "next";


export default async function Orders () {
    const orders = await getUserOrdersSSR({
        page: 1,
    });

    if (!orders) {
        redirect('/');
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