import {Metadata} from "next";
import {getShopsSSR} from "@lib/getShops.server";
import {notFound} from "next/navigation";
import ShopsArchiveTemplate from "@templates/ShopsArchiveTemplate";

export default async function ShopsPage() {
    const data = await getShopsSSR(1);

    if (!data?.shops || data.shops.length === 0) {
        notFound();
    }

    return (
        <ShopsArchiveTemplate
            shops={data.shops}
            currentPage={1}
            pagination={data.pagination}
        />
    );
}

export const metadata: Metadata = {
    title: 'Магазини',
    description: 'Наші магазини',
    robots: {
        index: true,
        follow: true,
    },
};