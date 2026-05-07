import CategoryTemplate from "@templates/CategoryTemplate";
import {notFound, permanentRedirect} from "next/navigation";
import {getPage} from "@lib/getPage.server";

const Page = async ({
    params,
}: {
    params: Promise<{ slug: string, page?: string[] }>
}) => {
    const { slug, page } = await params;
    const currentPage = page?.length === 2 && page?.[0] === 'page'
        ? Number(page[1])
        : 1;

    if (currentPage === 1 && page?.length) {
        if (page?.[0] === 'page') {
            permanentRedirect(`/${slug}`);
        }
        else {
            notFound();
        }
    }

    const data = await getPage(slug, currentPage);

    if (!data) {
        notFound();
    }

    if (data.pagination && currentPage > data.pagination.total_pages) {
        notFound();
    }

    switch (data.type) {
        case 'category':
            return <CategoryTemplate
                entity={data.entity}
                initialProducts={data.products}
                initialPagination={data.pagination}
                initialFilters={data.filters}
                slug={slug}
                initialPage={currentPage}
            />;

        default:
            notFound();
    }
};

export default Page;