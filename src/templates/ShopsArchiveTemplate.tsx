"use client";

import {Col, Row} from "react-bootstrap";
import {ShopsCollectionObject} from "@interfaces/entities/shops";
import ShopCollectionItem from "@src/components/Shops/ShopCollectionItem";
import PaginationComponent from "@src/components/PaginationComponent";
import {PaginationObject} from "@interfaces/common";


type Props = {
    pagination: PaginationObject,
    currentPage: number;
    shops: ShopsCollectionObject[],
};

const ShopsArchiveTemplate = (
    {
        pagination,
        currentPage,
        shops,
    }: Props
) => {
    return (
        <section className="py-5">
            <div className="container">
                <Row
                    className="kalles-blog-grid my-4 g-4"
                >
                    {
                        shops.map(shop => (
                            <Col
                                key={shop.id}
                                sm={6}
                            >
                                <ShopCollectionItem
                                    shop={shop}
                                />
                            </Col>
                        ))
                    }
                </Row>

                <PaginationComponent
                    pagination={pagination}
                    slug="shops"
                    current_page={currentPage}
                />
            </div>
        </section>
    );
}

export default ShopsArchiveTemplate;