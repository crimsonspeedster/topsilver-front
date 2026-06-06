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
                    <p>{item.np_city}</p>
                }

                <p>{item.np_warehouse} ({item.np_warehouse_address})</p>
            </div>
        </>
    );
}

export default NPWarehouseData;