import {Metadata} from "next";
import {getShopsSSR} from "@lib/getShops.server";
import {notFound} from "next/navigation";
import ShopsArchiveTemplate from "@templates/ShopsArchiveTemplate";

export default async function ShopsPage() {
    const currentPage = 1;
    const data = await getShopsSSR(currentPage);

    if (!data?.shops || data.shops.length === 0) {
        notFound();
    }

    return (
        <ShopsArchiveTemplate
            shops={data.shops}
            currentPage={currentPage}
            pagination={data.pagination}
        />
    );
}

export const metadata: Metadata = {
    title: 'Магазини',
    description: 'Наші магазини',
    robots: {
        index: process.env.NODE_ENV === 'production',
        follow: process.env.NODE_ENV === 'production',
    },
};