"use client";

import {ProductCardObject} from "@interfaces/entities/product";
import ProductBlock from "@src/components/Product/ProductBlock";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';


type Props = {
    products: ProductCardObject[],
};

const ViewedProduct = (
    {
        products,
    }: Props
) => {
    return (
        <Swiper
            className="my-4 py-2"
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
                768: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                }
            }}
        >
            {
                products.map(product =>
                    <SwiperSlide
                        key={product.id}
                    >
                        <ProductBlock
                            product={product}
                        />
                    </SwiperSlide>
                )
            }
        </Swiper>
    )
}

export default ViewedProduct;