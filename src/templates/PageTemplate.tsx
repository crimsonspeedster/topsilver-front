import {PageObject} from "@interfaces/entities/page";
import PageBanner from "@src/commonsections/PageBanner";
import ContentEntityBlocks from "@src/components/Pages/ContentEntityBlocks";


type Props = {
    page: PageObject,
}

const PageTemplate = (
    props: Props
) => {
    return (
        <article>
            {
                props.page.banner && (
                    <PageBanner
                        title={props.page.title}
                        header_tag={'h1'}
                        media={props.page.banner}
                    />
                )
            }

            <ContentEntityBlocks
                content={props.page.blocks}
            />
        </article>
    );
}

export default PageTemplate;