'use client';

import {InstagramGridLayoutObject, InstagramGridObject} from "@interfaces/entities/blocks/instagram-grid";
import InstagramGridItem from "@src/components/Blocks/InstagramGridItem";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';


const InstagramGrid = (props: InstagramGridObject) => {
    return (
        <section className="py-5">
            <div className="container">
                <h2 className="font-playfair fw-semibold fs-30 text-uppercase text-center">{props.title}</h2>

                <Swiper
                    className="my-4 py-2"
                    slidesPerView={2}
                    spaceBetween={0}
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
                        props.posts.map((item, index) =>
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
            </div>
        </section>
    );
}

export default InstagramGrid;