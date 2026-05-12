import {Col, Row} from "react-bootstrap";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation, Pagination, Thumbs} from "swiper/modules";
import Image from "next/image";
import React, {useState} from "react";
import {MediaObject, VideoObject} from "@interfaces/common";
import ProductVideoElement from "@src/components/Product/Parts/ProductVideoElement";
import type {Swiper as SwiperClass} from "swiper/types";
import {useMediaQuery} from "react-responsive";


type Props = {
    gallery?: MediaObject[],
    title: string,
    videos?: VideoObject[],
};

const ProductVideoIcon = (
    {
        type
    }
    :
    {
        type: string,
    }
) => {
    switch (type) {
        case 'external':
            return (
                <i
                    className="lab la-youtube"
                />
            );
        default:
            return (
                <i
                    className="las la-play"
                />
            );
    }
};

const ProductTopGallery = (
    {
        gallery,
        title,
        videos,
    }: Props,
) => {
    const isMobile = useMediaQuery({ maxWidth: 1199 });
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass|null>(null);

    return (
        <Row className="g-2">
            <Col
                xl={2}
                className="mt-xl-3 mt-2 order-2 order-xl-1"
            >
                <Swiper
                    onSwiper={setThumbsSwiper}
                    className="productSmall"
                    pagination={{
                        type: 'progressbar'
                    }}
                    direction={isMobile ? 'horizontal' : 'vertical'}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    spaceBetween={10}
                    modules={[FreeMode, Pagination]}
                >
                    {
                        gallery && gallery.length > 0 && gallery.map(item => (
                            <SwiperSlide
                                key={item.id}
                            >
                                <Image
                                    src={item.url}
                                    className="object-fit-cover w-100 h-100 object-center"
                                    alt={title}
                                    width={300}
                                    height={381}
                                />
                            </SwiperSlide>
                        ))
                    }

                    {
                        videos && videos.length > 0 && videos.map((item, i) => (
                            <SwiperSlide
                                key={i}
                            >
                                <ProductVideoIcon
                                    type={item.type}
                                />

                                <Image
                                    src={item.thumbnail.url}
                                    className="object-fit-cover w-100 h-100 object-center"
                                    alt={title}
                                    width={300}
                                    height={381}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Col>

            <Col
                xl={9}
                className="mt-3 order-1 order-xl-2"
            >
                <Swiper
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Thumbs, Navigation]}
                    className="productMain"
                >
                    {
                        gallery && gallery.length > 0 && gallery.map(item => (
                            <SwiperSlide
                                key={item.id}
                            >
                                <Image
                                    src={item.url}
                                    className="object-fit-cover w-100 h-100 object-center"
                                    alt={title}
                                    width={900}
                                    height={1148}
                                />
                            </SwiperSlide>
                        ))
                    }

                    {
                        videos && videos.length > 0 && videos.map((item, i) => (
                            <SwiperSlide
                                key={i}
                            >
                                <ProductVideoElement
                                    type={item.type}
                                    link={item.link}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </Col>
        </Row>
    );
}

export default ProductTopGallery;