"use client";

import Header from "@src/components/Headers/Header";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import ProductSwiper from "@src/_pages/(product)/product-detail-full-width/ProductSwiper";
import ProductDetailFullWidrthTab from "@src/_pages/(product)/product-detail-full-width/ProductDetailFullWidrthTab";
import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import LikeProducts from "@src/commonsections/LikeProducts";
import ViewedProduct from "@src/commonsections/ViewedProducts";
import FooterPage from "@src/components/Footer";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";
import thumb1 from "@assets/images/single-product/full-width/thumb-01.jpg";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import {ProductObject} from "@interfaces/entities/product";


const ProductDetailTemplate = (
    {
        product,
    }
    :
    {
        product: ProductObject
    }
) => {
    const [shoppingShow, setShoppingShow] = useState(false);
    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);

    return (
        <>
            <Header />

            <BreadCrumb title="New Arrival" subTitle="Boxy Sweatshirt Stripe" />

            <ProductSwiper handleShoppingShow={handleShoppingShow} />

            <ProductDetailFullWidrthTab />

            <section className="pt-5 py-lg-5 mb-3">
                <div className="container">
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center mb-lg-4">
                                <h3 className="pb-lg-2">You may also like</h3>
                            </div>
                        </Col>
                    </Row>
                    <LikeProducts />
                </div>

                <div className="container">
                    <Row className="justify-content-center mt-3 mt-lg-5 pt-2">
                        <Col lg={7} >
                            <div className="text-center mb-lg-4 pb-lg-2">
                                <h3>Recently viewed products</h3>
                            </div>
                        </Col>
                    </Row>
                    <ViewedProduct />
                </div>
            </section>

            <FooterPage />

            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />
        </>
    );
};

export default ProductDetailTemplate;