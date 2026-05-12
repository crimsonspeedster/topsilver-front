import {Button, Col, Row} from "react-bootstrap";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation, Pagination, Thumbs} from "swiper/modules";
import Image from "next/image";
import thumb1 from "@assets/images/single-product/full-width/thumb-01.jpg";
import thumb2 from "@assets/images/single-product/full-width/thumb-02.jpg";
import thumb3 from "@assets/images/single-product/full-width/thumb-03.jpg";
import Link from "next/link";
import trust from "@assets/images/single-product/trust_img2.png";
import {DeliveryAndReturnModal, Question, SizeGuideModal} from "@src/components/ProductModal/ProductModals";
import React from "react";
import ProductTopGallery from "@src/components/Product/Parts/ProductTopGallery";
import ProductTopImage from "@src/components/Product/Parts/ProductTopImage";
import ProductTopInfo from "@src/components/Product/Parts/ProductTopInfo";
import {ProductTopProps} from "@interfaces/layouts/product";

const ProductTop = (
    props: ProductTopProps
) => {
    return (
        <section className="py-4">
            <div className="container-fluid">
                <Row className="py-3 gx-xl-1">
                    <Col
                        md={6}
                    >
                        {
                            ((props.gallery && props.gallery.length > 0) || (props.videos && props.videos.length > 0)) ?
                                <ProductTopGallery
                                    gallery={props.gallery}
                                    videos={props.videos}
                                    title={props.title}
                                />
                                :
                                <ProductTopImage
                                    title={props.title}
                                    media={props.media}
                                />
                        }
                    </Col>

                    <Col
                        md={6}
                        className="mt-5 mt-md-0"
                    >
                        <ProductTopInfo
                            id={props.id}
                            title={props.title}
                            price_formatted={props.price_formatted}
                            price_on_sale_formatted={props.price_on_sale_formatted}
                            discount_percent={props.discount_percent}
                            variant_attributes={props.variant_attributes}
                            type={props.type}
                            collections={props.collections}
                            categories={props.categories}
                            sku={props.sku}
                            short_description={props.short_description}
                            size_guide={props.size_guide}
                            delivery_and_return={props.delivery_and_return}
                        />
                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default ProductTop;