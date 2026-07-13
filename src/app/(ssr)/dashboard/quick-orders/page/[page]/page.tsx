import {Metadata} from "next";
import {getUserQuickOrdersSSR} from "@lib/auth/getUser.server";
import {notFound, permanentRedirect} from "next/navigation";
import QuickOrdersTemplate from "@templates/QuickOrdersTemplate";


type Props = {
    params: Promise<{
        page: string,
    }>
}

export default async function QuickOrdersPaginatePage(
    {
        params,
    }: Props
) {
    const {page} = await params;
    const currentPage = Number(page);
    const slug = 'dashboard/quick-orders';
    const quickOrders = await getUserQuickOrdersSSR({
        page: currentPage,
    });

    if (currentPage === 1) {
        permanentRedirect(`/${slug}`);
    }

    if (!quickOrders) {
        notFound();
    }

    if (quickOrders.pagination && currentPage > quickOrders.pagination.total_pages) {
        notFound();
    }

    return (
        <QuickOrdersTemplate
            orders={quickOrders.orders}
            initialPage={currentPage}
            slug={slug}
            pagination={quickOrders.pagination}
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
        title: `Мої швидкі замовлення - сторінка ${currentPage}`,
        description: `Історія та статуси швидких замовлень, сторінка ${currentPage}`,
        robots: {
            index: false,
            follow: false,
        },
    };
}