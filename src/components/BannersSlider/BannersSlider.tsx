'use client';

import {BannersSliderObject} from "@interfaces/entities/blocks/banners-slider";
import {Swiper, SwiperSlide} from "swiper/react";
import BannersSlide from "@src/components/BannersSlider/BannersSlide";
import {Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';


const BannersSlider = (props: BannersSliderObject) => {
    return (
        <section>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                autoHeight={false}
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                }}
            >
                {
                    props.slides.map((item, index) => (
                        <SwiperSlide
                            key={index}
                        >
                            <BannersSlide
                                item={item.attributes}
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </section>
    );
}

export default BannersSlider;