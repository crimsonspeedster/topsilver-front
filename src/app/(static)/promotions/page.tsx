import {Metadata} from "next";
import {getTaxonomiesSSR} from "@lib/getCollections.server";
import {notFound} from "next/navigation";
import TaxonomiesTemplate from "@templates/TaxonomiesTemplate";

export default async function CollectionsPage () {
    const currentPage = 1;
    const promotionsData = await getTaxonomiesSSR(currentPage, 'promotion');

    if (!promotionsData) {
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

export const metadata: Metadata = {
    title: 'Акції',
    description: 'Список акцій',
    robots: {
        index: process.env.NODE_ENV === 'production',
        follow: process.env.NODE_ENV === 'production',
    },
};