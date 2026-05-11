import {notFound, permanentRedirect} from "next/navigation";
import {getPage} from "@lib/getPage.server";
import TaxonomyProductsTemplate from "@templates/TaxonomyProductsTemplate";
import {parseTaxonomySearchParams} from "@services/taxonomy/taxonomy.utils";
import ProductDetailTemplate from "@templates/ProductDetailTemplate";


type Props = {
    params: Promise<{
        slug: string,
        page?: string[],
    }>,
    searchParams: Promise<Record<string, string | string[] | undefined>>,
}

const Page = async (
    {
        params,
        searchParams
    }: Props
) => {
    const { slug, page } = await params;
    const parsedSearchParams = parseTaxonomySearchParams(await searchParams);
    const currentPage = page?.length === 2 && page?.[0] === 'page'
        ? Number(page[1])
        : 1;

    if (currentPage == 1 && page?.length) {
        if (page?.[0] === 'page') {
            permanentRedirect(`/${slug}`);
        }
        else {
            notFound();
        }
    }

    const data = await getPage({
        slug,
        page: currentPage,
        filters: parsedSearchParams.filters,
        sort: parsedSearchParams.sort,
        price: parsedSearchParams.price,
    });

    if (!data) {
        notFound();
    }

    if (data.pagination && currentPage > data.pagination.total_pages) {
        notFound();
    }

    switch (data.type) {
        case 'category':
        case 'filter_page':
            const initialPriceObject = {
                min: parsedSearchParams.price?.min ?? data.filters.price.min,
                max: parsedSearchParams.price?.max ?? data.filters.price.max,
            }

            return <TaxonomyProductsTemplate
                entity={data.entity}
                initialProducts={data.products}
                initialPagination={data.pagination}
                initialFilters={data.filters}
                initialSort={parsedSearchParams.sort}
                initialPrice={initialPriceObject}
                slug={slug}
                initialPage={currentPage}
                type={data.type}
            />;
        case 'product':
            return <ProductDetailTemplate
                product={data.entity}
            />;

        default:
            notFound();
    }
};

export default Page;