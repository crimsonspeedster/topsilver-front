'use client';

import {Col, Row, Tab, Nav} from "react-bootstrap";
import ProductBlock from "@src/components/Product/ProductBlock";
import React from "react";
import {
    ProductGridWithTabsLayoutObject, ProductGridWithTabsObject
} from "@interfaces/entities/blocks/products-grid-with-tabs";


const ProductsGridWithTabs = (props: ProductGridWithTabsObject) => {
    return (
        <section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-5">
                            <div>
                                <h1 className="position-relative text-capitalize font-playfair fw-medium">
                                    {
                                        props.title
                                    }
                                </h1>

                                <span className="dn tt_divider">
                                    <span />
                                    <i className="la la-close fs-14 text-muted" />
                                    <span />
                                </span>
                            </div>

                            {
                                props.description &&
                                (
                                    <p className="fs-14 text-muted mt-2 mb-0">{props.description}</p>
                                )
                            }
                        </div>
                    </div>
                </div>

                <Tab.Container
                    defaultActiveKey={props.blocks[0].attributes.tab_slug}
                >
                    <Nav
                        className="tab_header gap-lg-4 justify-content-center mt-4 mb-0"
                    >
                        {
                            props.blocks.map((item, index) => (
                                <Nav.Item
                                    key={index}
                                >
                                    <Nav.Link
                                        eventKey={item.attributes.tab_slug}
                                        className="rounded-pill"
                                    >
                                        {item.attributes.tab_name}
                                    </Nav.Link>
                                </Nav.Item>
                            ))
                        }
                    </Nav>

                    <Tab.Content className='mt-4' id="pills-tabContent">
                        {
                            props.blocks.map((item, index) => (
                                <Tab.Pane
                                    key={index}
                                    eventKey={item.attributes.tab_slug}
                                >
                                    <Row className="g-lg-4 g-3">
                                        {
                                            item.attributes.products.map(product => (
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
                                </Tab.Pane>
                            ))
                        }
                    </Tab.Content>
                </Tab.Container>
            </div>
        </section>
    );
}

export default ProductsGridWithTabs;