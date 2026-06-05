"use client";

import React, {useState} from "react";
import {Col, Nav, Row, Tab} from "react-bootstrap";
import PDPTabDescription from "@src/components/Product/Tabs/PDPTabDescription";
import {ReviewObject} from "@interfaces/entities/reviews";
import {useTranslations} from "next-intl";
import PDPTabComments from "@src/components/Product/Tabs/PDPTabComments";


type Props = {
    description?: string|null,
    characteristics?: string|null,
    guarantee?: string|null,
    reviews: ReviewObject[],
    rating_avg: string,
    rating_count: number,
    product_id: number,
    rating_distribution: number[];
};

const ProductTabs = (
    {
        description,
        characteristics,
        guarantee,
        reviews,
        rating_count,
        product_id,
        rating_avg,
        rating_distribution,
    }: Props
) => {
    const t = useTranslations('Common');
    const tabs = [];

    if (description) {
        tabs.push(
            {
                'title': t('tab_description'),
                'slug': 'description',
                'content': (
                    <PDPTabDescription
                        description={description}
                    />
                )
            }
        );
    }

    if (guarantee) {
        tabs.push(
            {
                'title': t('tab_guarantee'),
                'slug': 'guarantee',
                'content': (
                    <PDPTabDescription
                        description={guarantee}
                    />
                )
            }
        );
    }

    if (characteristics) {
        tabs.push(
            {
                'title': t('tab_characteristics'),
                'slug': 'characteristics',
                'content': (
                    <PDPTabDescription
                        description={characteristics}
                    />
                )
            }
        );
    }

    tabs.push(
        {
            'title': t('tab_reviews'),
            'slug': 'reviews',
            'content': (
                <PDPTabComments
                    product_id={product_id}
                    reviews={reviews}
                    rating_count={rating_count}
                    rating_avg={rating_avg}
                    rating_distribution={rating_distribution}
                />
            )
        }
    );

    const [activeTab, setActiveTab] = useState('description');

    return (
        <section className="mt-4 mb-5 py-5 main-project-section">
            <div className="container">
                <Tab.Container
                    activeKey={activeTab}
                    onSelect={(key: string|null) => setActiveTab(key ?? 'description')}
                >
                    <Row className="nav tab_header justify-content-center">
                        <Col>
                            <Nav variant="pills" className="tab_header nav_tabs justify-content-center">
                                {
                                    tabs.map((tab, index) => (
                                        <Nav.Item
                                            key={index}
                                        >
                                            <Nav.Link
                                                eventKey={tab.slug}
                                                className="rounded-pill pill-border fw-medium custom-nav-link"
                                            >
                                                {tab.title}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))
                                }
                            </Nav>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Tab.Content className="mt-5">
                                {
                                    tabs.map((tab, index) => (
                                        <Tab.Pane
                                            key={index}
                                            eventKey={tab.slug}
                                        >
                                            {
                                                tab.content
                                            }
                                        </Tab.Pane>
                                    ))
                                }
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </section>
    );
}

export default ProductTabs;