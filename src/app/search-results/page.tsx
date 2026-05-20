import {redirect} from "next/navigation";
import {Metadata} from "next";

type Props = {
    searchParams: Promise<Record<string, string | string[] | undefined>>,
}

const SearchResultsPage = async (
    {
        searchParams,
    }: Props
) => {
    const {s} = await searchParams;

    if (!s) {
        redirect('/');
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