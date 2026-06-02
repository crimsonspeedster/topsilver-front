'use client';

import {LatestPromotionsObject} from "@interfaces/entities/blocks/latest-promotions";
import LatestBlogItem from "@src/components/LatestBlog/LatestBlogItem";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';


const LatestBlog = (props: LatestPromotionsObject) => {
    return (
        <section className="kalles-section_type_featured_blog latest-blogs">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="text-center mb-4 pb-2">
                            <div className="mb-2">
                                <h2 className="section-title position-relative flex text-uppercase">
                                    {props.title}
                                </h2>
                            </div>

                            {
                                props.description &&
                                <p className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">{props.description}</p>
                            }
                        </div>
                    </div>
                </div>

                <Swiper
                    className="mt-3"
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={true}
                    loop={true}
                    modules={[Navigation]}
                    breakpoints={{
                        576: {
                            slidesPerView: 2,
                            spaceBetween: 24,
                        },
                        992: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        }
                    }}
                >
                    {
                        props.promotions.map(item => (
                            <SwiperSlide
                                key={item.id}
                            >
                                <LatestBlogItem
                                    item={item}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    );
}

export default LatestBlog;