'use client';

import {ProductCardObject} from "@interfaces/entities/product";
import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from "next-intl";
import FallbackImage from '@assets/images/fallback.png';
import WishListButton from "@src/components/Product/Parts/WishListButton";
import axios from "axios";
import {useProductPopupStore} from "@src/store/product-popup-store";


type Props = {
    product: ProductCardObject,
}

const ProductBlock = (
    {
        product,
    }
    : Props) => {
    const {
        openQuickView,
        openQuickShop,
    } = useProductPopupStore();
    const t = useTranslations('Product');

    const handleQuickModal = async (
        id: number,
        type: string,
    ) => {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_ENV_API_V1_LINK}/products/${id}`,
            {
                params: {
                    type
                },
            }
        );

        const productData = response.data?.data ?? null;

        if (!productData) {
            return;
        }

        if (type === 'quick_view') {
            openQuickView(productData);
        }
        else {
            openQuickShop(productData);
        }
    }

    return (
        <div className="topbar-product-card pb-3 w-100">
            <div className="position-relative topbar-product-card__header overflow-hidden">
                {
                    (product.labels.length > 0 || product.discount_percent) &&
                    (
                        <span className="labels">
                            {
                                product.labels.map(label => (
                                    <span key={label.slug} className={`label label--${label.slug}`}>
                                        {label.name}
                                    </span>
                                ))
                            }

                            {
                                product.discount_percent &&
                                <span className="label label--promotion label--percent">-{product.discount_percent}%</span>
                            }
                        </span>
                    )
                }

                <Link
                    href={`/${product.slug}`}
                >
                    <Image
                        src={product.media ? product.media.url : FallbackImage}
                        alt={product.title}
                        className="img-fluid w-100 h-100 object-fit-cover object-center"
                        width={360}
                        height={459}
                    />
                </Link>

                <WishListButton
                    id={product.id}
                    parentClasses='d-lg-none cursor-pointer position-absolute wishlist-button--pc'
                    childClasses='text-white'
                />

                <WishListButton
                    id={product.id}
                    parentClasses='wishlistadd cursor-pointer d-none d-lg-flex position-absolute'
                    childClasses='text-white'
                />

                <div className="product-button d-none d-lg-flex flex-column gap-2">
                    <button
                        data-bs-toggle="modal"
                        className="btn rounded-pill fs-14"
                        onClick={() => handleQuickModal(
                            product.id,
                            'quick_view',
                        )}
                    >
                        <span>{t('quick_view')}</span>

                        <i className="iccl iccl-eye"></i>
                    </button>

                    <button
                        type="button"
                        className="btn rounded-pill fs-14"
                        data-bs-toggle="modal"
                        onClick={() => handleQuickModal(
                            product.id,
                            'quick_shop',
                        )}
                    >
                        <span>{t('quick_shop')}</span>

                        <i className="iccl iccl-cart"></i>
                    </button>
                </div>

                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                    <button
                        className="btn responsive-cart rounded-pill fs-14 p-2"
                        style={{ width: 36, height: 36 }}
                        onClick={() => handleQuickModal(
                            product.id,
                            'quick_view',
                        )}
                    >
                        <i className="iccl iccl-eye fw-semibold"></i>
                    </button>

                    <button
                        type="button"
                        className="btn responsive-cart rounded-pill fs-14 p-2"
                        style={{ width: 36, height: 36 }}
                        onClick={() => handleQuickModal(
                            product.id,
                            'quick_shop',
                        )}
                    >
                        <i className="iccl iccl-cart fw-semibold"></i>
                    </button>
                </div>
            </div>

            <div className="mt-3">
                <h6 className="mb-1 fw-medium">
                    <Link href={`/${product.slug}`} className="main_link_acid_green">{product.title}</Link>
                </h6>

                <p className="mb-0 fs-14 text-muted">
                    {
                        product.price_on_sale_formatted ?
                            (
                                <>
                                    <del>{product.price_formatted}</del>&nbsp;
                                    <span className="text-danger">{product.price_on_sale_formatted}</span>
                                </>
                            )
                            :
                            (
                                <span>{product.price_formatted}</span>
                            )
                    }
                </p>
            </div>
        </div>
    );
};

export default ProductBlock;