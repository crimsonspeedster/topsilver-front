'use client';

import {useTranslations} from "next-intl";
import {QuickOrderObject} from "@interfaces/entities/orders";
import dayjs from "dayjs";
import {
    Badge,
    Card,
    Col,
    Row,
    Stack,
} from 'react-bootstrap';
import OrderItemElement from "@src/components/Dashboard/OrderItemElement";


type Props = {
    order: QuickOrderObject;
};

const QuickOrderCollection = ({order}: Props) => {
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

                    <Col lg={8}>
                        <h5 className="fw-semibold mb-3">
                            {tOrderDetails('products')}
                        </h5>

                        <Stack gap={2}>
                            <OrderItemElement
                                image={order.product_image}
                                name={order.product_name}
                                quantity={1}
                                price_formatted={order.total_formatted}
                                attributes={order.product_variant?.attributes}
                            />
                        </Stack>
                    </Col>

                    <Col lg={2}>
                        <div className="text-end">
                            <h5 className="mb-3 fw-semibold">
                                {tOrderDetails('total')}
                            </h5>

                            <div className="fs-5 fw-bold">
                                {order.total_formatted}
                            </div>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default QuickOrderCollection;