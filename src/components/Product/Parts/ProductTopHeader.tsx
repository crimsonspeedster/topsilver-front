import {ProductObject} from "@interfaces/entities/product";
import ProductPrices from "@src/components/Product/Parts/ProductPrices";


type Props = Pick<
    ProductObject,
    | 'title'
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'discount_percent'
    | 'short_description'
>;

const ProductTopHeader = (
    {
        title,
        price_formatted,
        price_on_sale_formatted,
        discount_percent,
        short_description,
    }: Props,
) => {
    return (
        <>
            <h1 className="mb-3">{title}</h1>

            <div className="d-flex flex-wrap justify-content-between w-max">
                <ProductPrices
                    price_formatted={price_formatted}
                    price_on_sale_formatted={price_on_sale_formatted}
                    discount_percent={discount_percent}
                />
            </div>

            {
                short_description &&
                <p className="text-muted">{short_description}</p>
            }
        </>
    );
}

export default ProductTopHeader;