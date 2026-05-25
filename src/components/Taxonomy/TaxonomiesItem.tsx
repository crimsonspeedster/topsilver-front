import {TaxonomyCollectionObject} from "@interfaces/entities/taxonomy";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import FallbackImage from '@assets/images/fallback.png';


type Props = {
    item: TaxonomyCollectionObject;
}

const TaxonomiesItem = (
    {
        item
    }: Props
) => {
    return (
        <Link
            href={`/${item.slug}`}
            className="d-block position-relative cat_grid_item overflow-hidden shop-collection-img"
        >
            <div className="h-100 w-100 cat-grid-img">
                <Image
                    src={item.media?.url ?? FallbackImage}
                    alt={item.title}
                    width={400}
                    height={600}
                    className="object-fit-cover object-center"
                />
            </div>

            <div className="cat-grid-button text-body">
                <div className="cat_grid_item__title">{item.title}</div>
            </div>
        </Link>
    );
}

export default TaxonomiesItem;