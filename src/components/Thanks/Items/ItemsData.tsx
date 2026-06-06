import {OrderItemObject} from "@interfaces/entities/orders";
import ProductData from "@src/components/Thanks/Items/ProductData";
import BundleData from "@src/components/Thanks/Items/BundleData";


type Props = {
    item: OrderItemObject;
};

const ItemsData = (
    {
        item,
    }: Props
) => {
    switch (item.entity_type) {
        case 'product':
            return <ProductData
                item={item}
            />

        case 'bundle':
            return <BundleData
                item={item}
            />

        default:
            return null;
    }
}

export default ItemsData;