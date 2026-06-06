import {ShippingDataObject} from "@interfaces/entities/orders";
import LocalPickupData from "@src/components/Thanks/Shipping/LocalPickupData";
import NPCourierData from "@src/components/Thanks/Shipping/NPCourierData";
import NPWarehouseData from "@src/components/Thanks/Shipping/NPWarehouseData";


type Props = {
    item: ShippingDataObject;
};

const ShippingMethodData = (
    {
        item,
    }: Props
) => {
    switch (item.shipping_method_type) {
        case 'local_pickup':
            return <LocalPickupData
                item={item}
            />;

        case 'nova_poshta_warehouse':
            return <NPWarehouseData
                item={item}
            />;

        case 'nova_poshta_courier':
            return <NPCourierData
                item={item}
            />;

        default:
            return null;
    }
};

export default ShippingMethodData;