import {ProductObject} from "@interfaces/entities/product";

type Props = Pick<
    ProductObject,
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'discount_percent'
>;

const ProductPrices = (
    {
        price_formatted,
        price_on_sale_formatted,
        discount_percent,
    }: Props,
) => {
    if (price_on_sale_formatted && discount_percent) {
        return (
            <>
                <div className="fs-16 me-2">
                    <del className="text-muted">{price_formatted}</del>&nbsp;
                    <span className="text-danger">{price_on_sale_formatted}</span>
                </div>

                <span className="bg-danger text-white p-1">-{discount_percent}%</span>
            </>
        );
    }

    return (
        <div className="fs-16 me-1">
            <del className="text-decoration-none">{price_formatted}</del>
        </div>
    );
}

export default ProductPrices;