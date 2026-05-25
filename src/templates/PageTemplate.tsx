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
                props.page.media && (
                    <PageBanner
                        title={props.page.title}
                        header_tag={'h1'}
                        media={props.page.media}
                    />
                )
            }

            <ContentEntityBlocks
                content={props.page.content}
            />
        </article>
    );
}

export default PageTemplate;