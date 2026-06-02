import {TaxonomyCollectionObject} from "@interfaces/entities/taxonomy";
import Link from "next/link";
import Image from "next/image";
import FallbackImage from '@assets/images/fallback.png';


type Props = {
    item: TaxonomyCollectionObject;
}

const LatestBlogItem = (
    {
        item,
    }: Props
) => {
    return (
        <div className="blog-card d-block blog-wrap">
            <Link
                href={`/${item.slug}`}
                className="blog_grid overflow-hidden"
            >
                <Image
                    src={item.media?.url ?? FallbackImage}
                    alt={item.title}
                    width={360}
                    height={246}
                    className="object-fit-cover object-center w-100"
                />
            </Link>

            <h6 className="fs-16 mt-3 main_link">
                <Link
                    href={`/${item.slug}`}
                    className="text-reset"
                >
                    {item.title}
                </Link>
            </h6>

            {
                item.description &&
                <div className="post-content text-muted mt-3">{item.description}</div>
            }
        </div>
    );
}

export default LatestBlogItem;