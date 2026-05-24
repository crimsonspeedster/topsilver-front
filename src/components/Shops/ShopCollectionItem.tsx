import {ShopsCollectionObject} from "@interfaces/entities/shops";
import Link from "next/link";
import Image from "next/image";
import FallbackImage from '@assets/images/fallback.png';
import {useTranslations} from "next-intl";


type Props = {
    shop: ShopsCollectionObject;
}

const ShopCollectionItem = (
    {
        shop,
    }: Props
) => {
    const tShops = useTranslations('Shops');

    return (
        <div>
            <div className="blog_grid overflow-hidden">
                <Link
                    href={`/${shop.slug}`}
                    className="blog_grid_img w-100"
                >
                    <Image
                        src={shop.media?.url ?? FallbackImage}
                        alt={shop.title}
                        width={600}
                        height={400}
                    />
                </Link>
            </div>

            <div className="mt-4">
                <Link
                    className="d-block w-100 mb-3"
                    href={`/${shop.slug}`}
                >{shop.title}</Link>

                <p className="mb-3">{tShops('address')}: <a href={shop.address_link} target="_blank" rel="nofollow noopener noindex">{shop.address}</a></p>

                <p
                    className="mb-3"
                >{tShops('phone')}: <a href={`tel:+${shop.phone}`}>{shop.phone}</a></p>

                <div
                    className=""
                    dangerouslySetInnerHTML={{
                        __html:  shop.time_working
                    }}
                />
            </div>
        </div>
    );
}

export default ShopCollectionItem;