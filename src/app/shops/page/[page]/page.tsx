import {getShopsSSR} from "@lib/getShops.server";
import {notFound, permanentRedirect} from "next/navigation";
import ShopsArchiveTemplate from "@templates/ShopsArchiveTemplate";
import {Metadata} from "next";
import {getBaseUrl} from "@helpers/functions.server";


type Props = {
    params: Promise<{
        page: string,
    }>
}

export default async function ShopsPaginatePage(
    {
        params,
    }: Props
) {
    const {page} = await params;
    const currentPage = Number(page);
    const data = await getShopsSSR(currentPage);

    if (currentPage === 1) {
        permanentRedirect(`/shops`);
    }

    if (!data?.shops || data.shops.length === 0 || (data.pagination && currentPage > data.pagination.total_pages)) {
        return notFound();
    }

    return (
        <ShopsArchiveTemplate
            shops={data.shops}
            currentPage={currentPage}
            pagination={data.pagination}
        />
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const {page} = await params;
    const currentPage = Number(page);
    const baseUrl = await getBaseUrl();

    const isFirstPage = currentPage <= 1;
    const title_base = 'Магазини';
    const description_base = 'Наші магазини';

    const title = isFirstPage
        ? title_base
        : `${title_base} - Сторінка ${currentPage}`;

    const description = isFirstPage
        ? description_base ?? ''
        : `${description_base ?? ''} - Сторінка ${currentPage}`;

    return {
        title,
        description,
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: isFirstPage
                ? `${baseUrl}/shops`
                : `${baseUrl}/shops/page/${currentPage}`,
        },
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}