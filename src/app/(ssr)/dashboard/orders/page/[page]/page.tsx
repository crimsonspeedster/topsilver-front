import {getUserOrdersSSR} from "@lib/auth/getUser.server";
import {notFound, permanentRedirect} from "next/navigation";
import OrdersTemplate from "@templates/OrdersTemplate";
import {Metadata} from "next";


type Props = {
    params: Promise<{
        page: string,
    }>
}

export default async function OrdersPage (
    {
        params
    }: Props
) {
    const {page} = await params;
    const currentPage = Number(page);
    const orders = await getUserOrdersSSR({
        page: currentPage,
    });
    const slug = 'dashboard/orders';

    if (currentPage === 1) {
        permanentRedirect(`/${slug}`);
    }

    if (!orders) {
        notFound();
    }

    if (orders.pagination && currentPage > orders.pagination.total_pages) {
        notFound();
    }

    return (
        <OrdersTemplate
            orders={orders.orders}
            initialPage={currentPage}
            slug={slug}
            pagination={orders.pagination}
        />
    );
}

export async function generateMetadata(
    {
        params,
    }: Props
): Promise<Metadata> {
    const {page} = await params;
    const currentPage = Number(page);

    return {
        title: `Мої замовлення - сторінка ${currentPage}`,
        description: `Історія та статуси замовлень, сторінка ${currentPage}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}