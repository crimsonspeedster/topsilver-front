import {ShippingNovaPoshtaWarehouseObject} from "@interfaces/entities/orders";


type Props = {
    item: ShippingNovaPoshtaWarehouseObject;
}

const NPWarehouseData = (
    {
        item,
    }: Props
) => {
    return (
        <>
            <div className="text-muted">
                <p className="mb-2">{item.shipping_method_name}</p>

                {
                    item.np_city &&
                    <p className="mb-2">{item.np_city}</p>
                }

                <p className="mb-0">{item.np_warehouse}</p>
            </div>
        </>
    );
}

export default NPWarehouseData;