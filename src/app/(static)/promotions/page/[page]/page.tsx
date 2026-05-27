import {getTaxonomiesSSR} from "@lib/getCollections.server";
import {notFound, permanentRedirect} from "next/navigation";
import TaxonomiesTemplate from "@templates/TaxonomiesTemplate";
import {Metadata} from "next";
import {getBaseUrl} from "@helpers/functions.server";


type Props = {
    params: Promise<{
        page: string,
    }>
}

export default async function CollectionsPaginatePage(
    {
        params,
    }: Props
) {
    const {page} = await params;
    const currentPage = Number(page);
    const promotionsData = await getTaxonomiesSSR(currentPage, 'promotion');

    if (currentPage === 1) {
        permanentRedirect('/promotions');
    }

    if (!promotionsData || (promotionsData.pagination && currentPage > promotionsData.pagination.total_pages)) {
        notFound();
    }

    return (
        <TaxonomiesTemplate
            title="Акції"
            taxonomies={promotionsData.taxonomies}
            pagination={promotionsData.pagination}
            slug="promotions"
            currentPage={currentPage}
        />
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const {page} = await params;
    const currentPage = Number(page);
    const baseUrl = await getBaseUrl();

    const isFirstPage = currentPage <= 1;
    const title_base = 'Акції';
    const description_base = 'Список акцій';

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
            index: process.env.NODE_ENV === 'production',
            follow: process.env.NODE_ENV === 'production',
        },
        alternates: {
            canonical: isFirstPage
                ? `${baseUrl}/promotions`
                : `${baseUrl}/promotions/page/${currentPage}`,
        },
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}