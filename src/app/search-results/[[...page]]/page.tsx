import {notFound, permanentRedirect, redirect} from "next/navigation";
import {Metadata} from "next";
import {parseTaxonomySearchParams} from "@services/taxonomy/taxonomy.utils";


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
    const parsedSearchParams = parseTaxonomySearchParams(await searchParams);
    const currentPage = page?.length === 2 && page?.[0] === 'page'
        ? Number(page[1])
        : 1;

    if (currentPage === 1 && page?.length) {
        if (page?.[0] === 'page') {
            permanentRedirect(`/search-results`);
        }
        else {
            notFound();
        }
    }

    return (
        <p>search results</p>
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