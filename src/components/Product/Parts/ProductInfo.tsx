import {TaxonomyCollectionObject} from "@interfaces/entities/taxonomy";
import {useTranslations} from "next-intl";
import Link from "next/link";


type Props = {
    collections: TaxonomyCollectionObject[],
    categories: TaxonomyCollectionObject[],
    sku: string,
};

const ProductInfo = (
    {
        collections,
        categories,
        sku,
    }: Props
) => {
    const t = useTranslations('Product');

    return (
        <div className="mt-4">
            <p className="text-muted mb-1">
                <span className="text-body">SKU:</span> {sku}
            </p>

            {
                categories.length > 0 &&
                <p className="text-muted mb-1">
                    <span className="text-body">{t('categories')}: </span>
                    {
                        categories.map((category, index) => (
                            <Link
                                key={category.id}
                                href={category.slug}
                                className="main_link text-muted"
                            >
                                {category.title}
                                {
                                    index < categories.length - 1 ?
                                        ', '
                                        :
                                        null
                                }
                            </Link>
                        ))
                    }
                </p>
            }

            {
                collections.length > 0 &&
                <p className="text-muted mb-1">
                    <span className="text-body">{t('collections')}: </span>
                    {
                        collections.map((collection, index) => (
                            <Link
                                key={collection.id}
                                href={collection.slug}
                                className="main_link text-muted"
                            >
                                {collection.title}
                                {
                                    index < collections.length - 1 ?
                                        ', '
                                        :
                                        null
                                }
                            </Link>
                        ))
                    }
                </p>
            }
        </div>
    );
}

export default ProductInfo;