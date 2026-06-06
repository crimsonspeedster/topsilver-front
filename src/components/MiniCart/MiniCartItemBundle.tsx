import Image from "next/image";
import {CartItemBundleObject} from "@interfaces/entities/cart";
import FallbackImage from "@assets/images/fallback.png";
import CartItemRemove from "@src/components/Cart/CartItemRemove";


type Props = {
    item: CartItemBundleObject,
    handleShoppingClose: ()=>void,
};

const MiniCartItemBundle = (
    {
        handleShoppingClose,
        item,
    }: Props
) => {
    return (
        <div className="p-20 border-top">
            <div className="row">
                <div className="col-5">
                    <div>
                        <Image
                            src={FallbackImage}
                            width={110}
                            height={137}
                            alt={item.entity.title}
                            className="object-fit-cover object-center"
                        />
                    </div>
                </div>

                <div className="col-7">
                    <h6 className="mb-1">
                        <span
                            className="product-title"
                        >
                            {item.entity.title}
                        </span>
                    </h6>

                    {
                        item.product_variant &&
                        <p className="text-muted fs-12">
                            {
                                item.product_variant.attribute_terms && item.product_variant.attribute_terms.length > 0 &&
                                item.product_variant.attribute_terms.map((attr, i) => (
                                    <span
                                        key={attr.id}
                                    >
                                        {
                                            attr.title
                                        }
                                        {
                                            ' '
                                        }
                                    </span>
                                ))
                            }
                        </p>
                    }

                    <p className="fs-14 text-muted d-flex align-items-center gap-2">
                        <span>{item.price_formatted}</span>
                    </p>

                    <p className="text-muted fs-14">x {item.quantity}</p>

                    <div className="d-flex align-items-center gap-3 mt-2">
                        <CartItemRemove
                            id={item.id}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MiniCartItemBundle;