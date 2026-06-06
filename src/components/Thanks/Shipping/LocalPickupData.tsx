import {ShippingLocalPickupObject} from "@interfaces/entities/orders";


type Props = {
    item: ShippingLocalPickupObject;
};

const LocalPickupData = (
    {
        item,
    }: Props
) => {
    return (
        <div className="text-muted">
            <p className="mb-2">{item.shipping_method_name}</p>

            <a
                href={item.shop_link}
                className="btn btn-link p-0 mb-2 d-block text-start"
                target="_blank"
                rel="noopener noreferrer noindex"
            >{item.shop_address}</a>

            <a
                className="btn btn-link p-0 d-block text-start"
                href={`tel:${item.shop_phone}`}
            >{item.shop_phone}</a>
        </div>
    );
}

export default LocalPickupData;