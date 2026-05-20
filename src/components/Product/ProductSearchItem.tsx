import Link from "next/link";
import Image from "next/image";
import { Row } from 'react-bootstrap';
import FallbackImage from '@assets/images/fallback.png';
import {ProductSearchObject} from "@interfaces/entities/product";
import ProductPrices from "@src/components/Product/Parts/ProductPrices";


type Props = {
    item: ProductSearchObject,
}

const ProductSearchItem = (
    {
        item,
    }: Props
) => {
    return (
        <Row className="mb-3">
            <div className="col-4">
                <Link href={`/${item.slug}`}>
                    <Image
                        src={item.media?.url ?? FallbackImage}
                        alt={item.title}
                        className="object-fit-cover object-center"
                        width={80}
                        height={80}
                    />
                </Link>
            </div>

            <div className="col-8">
                <h6 className="mb-2">
                    <Link
                        href={`/${item.slug}`}
                        className="product-title"
                    >
                        {item.title}
                    </Link>
                </h6>

                <ProductPrices
                    discount_percent={item.discount_percent}
                    price_formatted={item.price_formatted}
                    price_on_sale_formatted={item.price_on_sale_formatted}
                />
            </div>
        </Row>
    );
}

export default ProductSearchItem;