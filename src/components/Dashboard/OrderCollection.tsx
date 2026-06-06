'use client';

import dayjs from "dayjs";
import {
    Badge,
    Card,
    Col,
    Image,
    Row,
    Stack,
} from 'react-bootstrap';
import {OrderObject} from "@interfaces/entities/orders";
import Link from "next/link";
import ShippingMethodData from "@src/components/Thanks/Shipping/ShippingMethodData";
import {useTranslations} from "next-intl";


type Props = {
    order: OrderObject;
}

const OrderCollection = ({ order }: Props) => {
    const tOrderDetails = useTranslations('OrderDetails');

    const statusMap: Record<string, string> = {
        pending_payment: 'warning',
        created: 'secondary',
        processing: 'primary',
        shipped: 'info',
        delivered: 'success',
        completed: 'success',
        cancelled: 'danger',
    };

    const formatDate = (date: string) => dayjs(date).format('DD.MM.YYYY HH:mm');

    return (
        <Card className="shadow-sm mb-3">
            <Card.Body>
                <Row className="g-3 align-items-start">
                    <Col lg={2}>
                        <h5 className="fw-semibold mb-3">{tOrderDetails('order_title')} #{order.id}</h5>

                        <p className="text-muted small"> {formatDate(order.created_at)}</p>

                        <Badge
                            bg={statusMap[order.status_value] ?? 'secondary'}
                            className="mt-2"
                        >
                            {order.status_label}
                        </Badge>
                    </Col>

                    <Col lg={4}>
                        <h5 className="fw-semibold mb-3">
                            {tOrderDetails('products')}
                        </h5>

                        <Stack gap={2}>
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="d-flex gap-2"
                                >
                                    {'entity_image' in item && item.entity_image && (
                                        <Image
                                            src={item.entity_image}
                                            width={48}
                                            height={48}
                                            rounded
                                        />
                                    )}

                                    <div>
                                        <h6>
                                            {item.entity_name}
                                        </h6>

                                        <div className="small text-muted">
                                            {item.quantity} ×{' '}
                                            {item.entity_price_formatted}
                                        </div>

                                        {item.product_variant.length > 0 && (
                                            <div className="small text-muted">
                                                {item.product_variant
                                                    .map(
                                                        variant =>
                                                            `${variant.attribute_name}: ${variant.attribute_value}`,
                                                    )
                                                    .join(', ')}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Stack>
                    </Col>

                    <Col lg={2}>
                        <h5 className="fw-semibold mb-3">
                            {tOrderDetails('shipping')}
                        </h5>

                        <ShippingMethodData
                            item={order.shipping_data}
                        />
                    </Col>

                    <Col lg={2}>
                        <h5 className="mb-3 fw-semibold">{tOrderDetails('payment')}</h5>

                        <p className="mb-0 text-muted">
                            {order.payment_data.payment_method_name}
                        </p>
                    </Col>

                    <Col lg={2}>
                        <div className="text-end">
                            <h5 className="mb-3 fw-semibold">
                                {tOrderDetails('total')}
                            </h5>

                            <div className="fs-5 fw-bold">
                                {order.total_formatted}
                            </div>

                            <Link
                                href={`/dashboard/orders/${order.id}`}
                                className="mt-2 btn-primary btn"
                            >
                                {tOrderDetails('order_details')}
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default OrderCollection;