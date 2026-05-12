import Variations from "@src/components/Product/Parts/Variations";
import WishListButton from "@src/components/Product/Parts/WishListButton";
import ButtonWithPopup from "@src/components/Product/Parts/ButtonWithPopup";
import ProductInfo from "@src/components/Product/Parts/ProductInfo";
import {ProductObject} from "@interfaces/entities/product";
import ProductPrices from "@src/components/Product/Parts/ProductPrices";
import {useTranslations} from "next-intl";
import ProductTopHeader from "@src/components/Product/Parts/ProductTopHeader";
import ProductPurchase from "@src/components/Product/Forms/ProductPurchase";
import {ProductTopProps} from "@interfaces/layouts/product";


type Props = Pick<
    ProductTopProps,
    | 'id'
    | 'title'
    | 'price_formatted'
    | 'price_on_sale_formatted'
    | 'discount_percent'
    | 'short_description'
    | 'variant_attributes'
    | 'type'
    | 'collections'
    | 'categories'
    | 'sku'
>;

const ProductTopInfo = (
    {
        id,
        title,
        price_formatted,
        price_on_sale_formatted,
        discount_percent,
        short_description,
        variant_attributes,
        type,
        size_guide,
        delivery_and_return,
        collections,
        sku,
        categories,
    }: Props,
) => {
    const tProduct = useTranslations('Product');

    return (
        <>
            <ProductTopHeader
                title={title}
                price_formatted={price_formatted}
                price_on_sale_formatted={price_on_sale_formatted}
                discount_percent={discount_percent}
                short_description={short_description}
            />

            {
                type === 'variable' &&
                <Variations
                    variants={variant_attributes}
                />
            }

            <div className="d-flex flex-wrap align-items-center gap-2">
                 {/*TODO: Quantity*/}
                <ProductPurchase
                    id={id}
                />

                {/*<WishListButton*/}
                {/*    id={id}*/}
                {/*    parentClasses="product_wishlist square-40 rounded-circle border border-dark bg-transparent text-center leading-40"*/}
                {/*/>*/}
            </div>

            {
                (size_guide || delivery_and_return) &&
                <div className="mt-4 d-flex gap-3 text-nowrap flex-wrap row-gap-1">
                    {
                        size_guide &&
                        <ButtonWithPopup
                            title={tProduct('size_guid')}
                            content={size_guide}
                        />
                    }

                    {
                        delivery_and_return &&
                        <ButtonWithPopup
                            title={tProduct('delivery_and_return')}
                            content={delivery_and_return}
                        />
                    }
                </div>
            }

            <ProductInfo
                collections={collections}
                categories={categories}
                sku={sku}
            />
        </>
    );
}

export default ProductTopInfo;