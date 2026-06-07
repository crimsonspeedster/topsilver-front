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
                props.shop.banner && (
                    <PageBanner
                        title={props.shop.title}
                        header_tag={'h1'}
                        media={props.shop.banner}
                    />
                )
            }

            <ContentEntityBlocks
                content={props.shop.blocks}
            />

            {
                props.shop.seo_block &&
                <ContentEntityBlocks
                    content={props.shop.seo_block.content}
                />
            }
        </article>
    );
}

export default ShopSingleTemplate;