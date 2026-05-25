import {ProductsGridLayoutObject, ProductsGridObject} from "@interfaces/entities/blocks/products-grid";
import {Col, Row} from "react-bootstrap";
import ProductBlock from "@src/components/Product/ProductBlock";
import React from "react";

const ProductsGrid = (props: ProductsGridLayoutObject) => {
    return (
        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5">
                            <div>
                                <h1 className="position-relative text-capitalize font-playfair fw-medium">
                                    {
                                        props.attributes.title
                                    }
                                </h1>

                                <span className="dn tt_divider">
                                    <span />
                                    <i className="la la-close fs-14 text-muted" />
                                    <span />
                                </span>
                            </div>

                            {
                                props.attributes.description &&
                                (
                                    <p className="fs-14 text-muted mt-2 mb-0">{props.attributes.description}</p>
                                )
                            }
                        </div>
                    </div>
                </div>

                <Row className="g-lg-4 g-3">
                    {
                        props.attributes.products.map(product => (
                            <Col
                                xs={6}
                                lg={4}
                                xl={3}
                                key={product.id}
                            >
                                <ProductBlock
                                    key={product.id}
                                    product={product}
                                />
                            </Col>
                        ))
                    }
                </Row>
            </div>
        </section>
    );
}

export default ProductsGrid;