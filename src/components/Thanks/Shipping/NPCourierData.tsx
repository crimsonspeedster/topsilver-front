import {ShippingNovaPoshtaCourierObject} from "@interfaces/entities/orders";


type Props = {
    item: ShippingNovaPoshtaCourierObject;
}

const NPCourierData = (
    {
        item,
    }: Props
) => {
    return (
        <div className="text-muted">
            <p className="mb-2">{item.shipping_method_name}</p>

            <p>{item.np_city} {item.np_street} {item.np_house_number} {item.np_apartment_number}</p>
        </div>
    );
}

export default NPCourierData;