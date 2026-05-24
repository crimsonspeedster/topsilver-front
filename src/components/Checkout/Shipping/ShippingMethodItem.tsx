import LocalPickup from "@src/components/Checkout/Shipping/LocalPickup";
import NPCourier from "@src/components/Checkout/Shipping/NPCourier";
import NPWarehouse from "@src/components/Checkout/Shipping/NPWarehouse";

type Props = {
    type: string;
}

const ShippingMethodItem = (
    {
        type,
    }: Props
) => {
    switch (type) {
        case 'nova_poshta_warehouse':
            return (
                <NPWarehouse />
            );
        case 'nova_poshta_courier':
            return (
                <NPCourier />
            );
        default:
            return (
                <LocalPickup />
            );
    }
}

export default ShippingMethodItem;