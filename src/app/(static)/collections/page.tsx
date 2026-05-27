import {Metadata} from "next";
import {getTaxonomiesSSR} from "@lib/getCollections.server";
import {notFound} from "next/navigation";
import TaxonomiesTemplate from "@templates/TaxonomiesTemplate";

export default async function CollectionsPage () {
    const currentPage = 1;
    const collectionsData = await getTaxonomiesSSR(currentPage, 'collection');

    if (!collectionsData) {
        notFound();
    }

    return (
        <TaxonomiesTemplate
            title="Колекції"
            taxonomies={collectionsData.taxonomies}
            pagination={collectionsData.pagination}
            slug="collections"
            currentPage={currentPage}
        />
    );
}

export const metadata: Metadata = {
    title: 'Колекції',
    description: 'Список колекцій',
    robots: {
        index: process.env.NODE_ENV === 'production',
        follow: process.env.NODE_ENV === 'production',
    },
};