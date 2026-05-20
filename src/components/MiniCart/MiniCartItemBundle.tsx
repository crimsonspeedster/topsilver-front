import {CartItemBundleObject} from "@interfaces/entities/cart";


type Props = {
    item: CartItemBundleObject;
    handleShoppingClose: ()=>void,
}

const MiniCartItemBundle = (
    {
        item,
        handleShoppingClose,
    }: Props
) => {
    return (
        <p>Bundle</p>
    );
}

export default MiniCartItemBundle;