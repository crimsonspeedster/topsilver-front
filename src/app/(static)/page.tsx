import {getHomePage, getHomePageSeo} from "@lib/getPage.server";
import PageTemplate from "@templates/PageTemplate";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {getBaseUrl} from "@helpers/functions.server";

const IndexPage = async () => {
    const pageData = await getHomePage();

    if (!pageData) {
        notFound();
    }

    return (
        <PageTemplate
            page={pageData}
        />
    );
}

export async function generateMetadata(): Promise<Metadata> {
    const seoData = await getHomePageSeo();
    const baseUrl = await getBaseUrl();

    if (!seoData?.seo) {
        return {};
    }

    const seo = seoData.seo;
    const media = seoData.media;

    return {
        title: seo.title,
        description: seo.description ?? '',
        robots: {
            index: seo.robots.index,
            follow: seo.robots.follow,
        },
        alternates: {
            canonical: `${baseUrl}/`,
        },
        openGraph: {
            title: seo.title,
            description: seo.description ?? '',
            images: media ? [media.url] : [],
            type: 'website',
        },
    };
}

export default IndexPage;