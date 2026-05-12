import {ProductCardObject} from "@interfaces/entities/product";
import React from "react";
import ViewedProduct from "@src/components/Product/Parts/ViewedProducts";

type Props = {
    title: string,
    products: ProductCardObject[],
}

const ViewedProductsSection = (
    {
        title,
        products,
    }: Props
) => {
    if (products.length === 0) {
        return null;
    }

    return (
        <section className="pt-5 py-lg-5 mb-3">
            <div className="container">
                <h3 className="text-center mb-lg-4">{title}</h3>

                <ViewedProduct
                    products={products}
                />
            </div>
        </section>
    );
}

export default ViewedProductsSection;