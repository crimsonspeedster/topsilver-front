import {ShopsObject} from "@interfaces/entities/shops";
import PageBanner from "@src/commonsections/PageBanner";
import ContentEntityBlocks from "@src/components/Pages/ContentEntityBlocks";

type Props = {
    shop: ShopsObject,
};

const ShopSingleTemplate = (props: Props) => {
    return (
        <article>
            {
                props.shop.media && (
                    <PageBanner
                        title={props.shop.title}
                        header_tag={'h1'}
                        media={props.shop.media}
                    />
                )
            }

            <ContentEntityBlocks />
        </article>
    );
}

export default ShopSingleTemplate;