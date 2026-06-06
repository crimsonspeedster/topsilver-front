'use client';

import {useTranslations} from "next-intl";
import {Badge, Row, Col} from "react-bootstrap";
import Link from "next/link";
import {OrderObject} from "@interfaces/entities/orders";
import ShippingMethodData from "@src/components/Thanks/Shipping/ShippingMethodData";
import ItemsData from "@src/components/Thanks/Items/ItemsData";


type Props = {
    order: OrderObject;
};

const OrderSingleTemplate = (
    {
        order,
    }: Props
) => {
    const tOrderDetails = useTranslations('OrderDetails');
    const tCommon = useTranslations('Common');

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="mb-2 text-center">{tOrderDetails('order_title')} #{order.id}</h1>

                <div className="mt-4">
                    <h5 className="mb-3">{tOrderDetails('order_details')}</h5>

                    <Row className="mb-2">
                        <Col sm={6} className="text-muted">
                            {tOrderDetails('status')}
                        </Col>

                        <Col sm={6} className="text-end">
                            <Badge bg="primary" className="fs-12">{order.status_label}</Badge>
                        </Col>
                    </Row>

                    {
                        order.items.map((item, index) => (
                            <ItemsData
                                key={index}
                                item={item}
                            />
                        ))
                    }

                    <Row className="mb-2">
                        <Col sm={6} className="text-muted">
                            {tOrderDetails('subtotal')}
                        </Col>

                        <Col sm={6} className="text-end">
                            {order.subtotal_formatted}
                        </Col>
                    </Row>

                    <Row className="mb-2">
                        <Col sm={6} className="text-muted">
                            {tOrderDetails('discount')}
                        </Col>

                        <Col sm={6} className="text-end">
                            -{order.discount_amount}
                        </Col>
                    </Row>

                    <hr/>

                    <Row>
                        <Col sm={6}>
                            <strong>{tOrderDetails('total')}</strong>
                        </Col>

                        <Col sm={6} className="text-end">
                            <strong>{order.total_formatted}</strong>
                        </Col>
                    </Row>
                </div>

                <div className="mt-4">
                    <h5 className="mb-3">{tOrderDetails('customer')}</h5>

                    <p className="mb-1">
                        {order.first_name} {order.middle_name} {order.last_name}
                    </p>

                    {order.email && (
                        <p className="mb-1 text-muted">{order.email}</p>
                    )}

                    <p className="mb-0 text-muted">{order.phone}</p>
                </div>

                <div className="mt-4">
                    <Row>
                        <Col md={6}>
                            <h5 className="mb-3">{tOrderDetails('shipping')}</h5>

                            <ShippingMethodData
                                item={order.shipping_data}
                            />
                        </Col>

                        <Col md={6} className="text-end">
                            <h5 className="mb-3">{tOrderDetails('payment')}</h5>

                            <p className="mb-0 text-muted">
                                {order.payment_data.payment_method_name}
                            </p>
                        </Col>
                    </Row>
                </div>

                <div className="mt-4 d-flex justify-content-center">
                    <Link
                        href="/"
                        className="btn btn-primary"
                    >
                        {tCommon('return_to_home')}
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default OrderSingleTemplate;