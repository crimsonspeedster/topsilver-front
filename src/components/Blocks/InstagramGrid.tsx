'use client';

import {InstagramGridObject} from "@interfaces/entities/blocks/instagram-grid";
import InstagramGridItem from "@src/components/Blocks/InstagramGridItem";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import {Autoplay} from "swiper/modules";


const InstagramGrid = (props: InstagramGridObject) => {
    const normalizedSlides =
        props.posts.length >= 7
            ? props.posts
            : Array.from(
                { length: 7 },
                (_, index) => props.posts[index % props.posts.length]
            );

    return (
        <section className="py-5">
            <div className="container">
                <h2 className="font-playfair fw-semibold fs-30 text-uppercase text-center">{props.title}</h2>
            </div>

            <Swiper
                className="mt-4"
                slidesPerView={2}
                spaceBetween={0}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                breakpoints={{
                    768: {
                        slidesPerView: 4,
                    },
                    992: {
                        slidesPerView: 6,
                    }
                }}
            >
                {
                    normalizedSlides.map((item, index) =>
                        <SwiperSlide
                            key={index}
                        >
                            <InstagramGridItem
                                item={item}
                            />
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </section>
    );
}

export default InstagramGrid;