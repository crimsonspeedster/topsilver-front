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

            <p className="mb-0">{item.np_locality_name} {item.np_street_name} {item.np_house_number} {item.np_apartment_number}</p>
        </div>
    );
}

export default NPCourierData;