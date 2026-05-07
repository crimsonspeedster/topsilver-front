export const getPage = async (slug: string, page: number) => {
    const url = new URL(
        `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/slug-resolver/${slug}`
    );

    url.searchParams.set("page", page.toString());

    const res = await fetch(url.toString(), {
        cache: "no-store",
    });

    if (!res.ok) {
        return null;
    }

    const json = await res.json();
    return json?.data ?? null;
};