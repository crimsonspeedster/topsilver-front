import {OrderItemBundleObject} from "@interfaces/entities/orders";
import {Col, Row} from "react-bootstrap";


type Props = {
    item: OrderItemBundleObject;
};

const BundleData = (
    {
        item,
    }: Props
) => {
    return (
        <Row className="mb-2">
            <Col sm={6}>
                {item.entity_name} x {item.quantity}
            </Col>

            <Col sm={6} className="text-end">
                {item.total_formatted}
            </Col>
        </Row>
    );
}

export default BundleData;