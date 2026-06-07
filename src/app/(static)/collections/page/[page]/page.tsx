import {getTaxonomiesSSR} from "@lib/getCollections.server";
import {notFound, permanentRedirect} from "next/navigation";
import TaxonomiesTemplate from "@templates/TaxonomiesTemplate";
import {Metadata} from "next";
import {getBaseUrl} from "@helpers/functions.server";
import {Suspense} from "react";


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
    const collectionsData = await getTaxonomiesSSR(currentPage, 'collection');

    if (currentPage === 1) {
        permanentRedirect('/collections');
    }

    if (!collectionsData || (collectionsData.pagination && currentPage > collectionsData.pagination.total_pages)) {
        notFound();
    }

    return (
        <Suspense>
            <TaxonomiesTemplate
                title="Колекції"
                taxonomies={collectionsData.taxonomies}
                pagination={collectionsData.pagination}
                slug="collections"
                currentPage={currentPage}
            />
        </Suspense>
    );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const {page} = await params;
    const currentPage = Number(page);
    const baseUrl = await getBaseUrl();

    const isFirstPage = currentPage <= 1;
    const title_base = 'Колекції';
    const description_base = 'Список колекцій';

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
                ? `${baseUrl}/collections`
                : `${baseUrl}/collections/page/${currentPage}`,
        },
        openGraph: {
            title,
            description,
            type: 'website',
        },
    };
}