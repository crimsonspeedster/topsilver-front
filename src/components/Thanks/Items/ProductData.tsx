import {OrderItemProductObject} from "@interfaces/entities/orders";
import {Col, Row} from "react-bootstrap";


type Props = {
    item: OrderItemProductObject;
};

const ProductData = (
    {
        item,
    }: Props
) => {
    const variantTitle = item.product_variant?.attributes?.length
        ? item.product_variant.attributes.map(v => v.attribute_value).join(' / ')
        : null;

    return (
        <Row className="mb-2">
            <Col sm={6}>
                {item.entity_name}

                {variantTitle && (
                    <span> ({variantTitle})</span>
                )}

                {' x '}{item.quantity}
            </Col>

            <Col sm={6} className="text-end">
                {item.total_formatted}
            </Col>
        </Row>
    );
}

export default ProductData;