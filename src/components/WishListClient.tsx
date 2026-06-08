'use client';

import {useTranslations} from "next-intl";
import {Row} from "react-bootstrap";
import ProductBlock from "@src/components/Product/ProductBlock";
import {WishlistObject} from "@interfaces/entities/wishlist";


type Props = {
    wishList: WishlistObject;
}

const WishListClient = (
    {
        wishList,
    }: Props
) => {
    const tWishList = useTranslations('Wishlist');
    const tCommon = useTranslations('Common');

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="text-center">{tWishList('wishlist')}</h1>

                {
                    wishList.items_count > 0 &&
                    <Row className="g-lg-4 g-3">
                        {
                            wishList.items.map(item => (
                                <div
                                    className='col-6 col-lg-4 col-xl-3'
                                     key={item.id}
                                >
                                    <ProductBlock
                                        product={item.product}
                                    />
                                </div>
                            ))
                        }
                    </Row>
                }

                {
                    wishList.items_count === 0 &&
                    <p className="text-center">{tCommon('no_products_found')}</p>
                }
            </div>
        </section>
    );
}

export default WishListClient;