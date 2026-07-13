'use client';

import {getFormattedProductAttributesString} from "@src/helpers";
import {OrderItemProductVariantAttributesObject} from "@interfaces/entities/orders";
import {Image} from "react-bootstrap";


type Props = {
    image: string | null;
    name: string;
    quantity: number;
    price_formatted: string;
    attributes?: OrderItemProductVariantAttributesObject[];
};

const OrderItemElement = (
    {
        image,
        name,
        quantity,
        price_formatted,
        attributes,
    }: Props
) => {
    return (
        <div
            className="d-flex gap-2"
        >
            {image && (
                <Image
                    src={image}
                    width={48}
                    height={48}
                    rounded
                />
            )}

            <div>
                <h6>
                    {name}
                </h6>

                <div className="small text-muted">
                    {quantity} ×{' '}
                    {price_formatted}
                </div>

                {
                    attributes && (
                        <div className="small text-muted">
                            {getFormattedProductAttributesString(attributes)}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default OrderItemElement;