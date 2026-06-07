import {notFound, permanentRedirect} from "next/navigation";
import {Metadata} from "next";
import {parseTaxonomySearchParams} from "@services/taxonomy/taxonomy.utils";
import {getSearchDataSSR} from "@lib/getSearch.server";
import TaxonomyProductsTemplate from "@templates/TaxonomyProductsTemplate";
import {Suspense} from "react";


type Props = {
    params: Promise<{
        page?: string[],
    }>,
    searchParams: Promise<Record<string, string | string[] | undefined>>,
}

const SearchResultsPage = async (
    {
        params,
        searchParams,
    }: Props
) => {
    const { page } = await params;
    const rawSearchParams = await searchParams;
    const parsedSearchParams = parseTaxonomySearchParams(rawSearchParams);
    const currentPage = page?.length === 2 && page?.[0] === 'page'
        ? Number(page[1])
        : 1;

    if (!parsedSearchParams.search) {
        permanentRedirect('/');
    }

    if (currentPage === 1 && page?.length) {
        if (page?.[0] === 'page') {
            const qs = new URLSearchParams();
            for (const [key, value] of Object.entries(rawSearchParams)) {
                if (value === undefined) {
                    continue;
                }

                if (Array.isArray(value)) {
                    value.forEach(v => qs.append(key, v));
                }
                else {
                    qs.append(key, value);
                }
            }
            permanentRedirect(`/search-results?${qs.toString()}`);
        }
        else {
            notFound();
        }
    }

    const searchData = await getSearchDataSSR(parsedSearchParams);

    if (!searchData) {
        notFound();
    }

    const urlForRest = `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/search`;
    const initialPriceObject = {
        min: parsedSearchParams.price?.min ?? searchData.filters.price.min,
        max: parsedSearchParams.price?.max ?? searchData.filters.price.max,
    }

    return (
        <Suspense>
            <TaxonomyProductsTemplate
                urlForRest={urlForRest}
                initialProducts={searchData.products}
                initialPagination={searchData.pagination}
                initialFilters={searchData.filters}
                initialSort={parsedSearchParams.sort}
                initialPrice={initialPriceObject}
                slug="search-results"
                initialPage={currentPage}
                initialCollections={searchData.collections}
                initialCategories={searchData.categories}
            />
        </Suspense>
    );
}

export default SearchResultsPage;

export const metadata: Metadata = {
    title: 'Результати пошуку',
    description: 'Результати пошуку',
    robots: {
        index: false,
        follow: true,
    },
};