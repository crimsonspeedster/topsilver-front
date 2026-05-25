import Link from "next/link";
import Image from "next/image";
import {CategoriesGridItemLayoutObject} from "@interfaces/entities/blocks/categories-grid";


const CategoriesGridItem = ({ item }: { item: CategoriesGridItemLayoutObject }) => {
    return (
        <Link
            href={`/${item.attributes.category.slug}`}
            className="d-block position-relative cat_grid_item overflow-hidden shops-img"
        >
            <div className="h-100 w-100">
                <Image
                    src={item.attributes.image}
                    alt={item.attributes.category.title}
                    width={600}
                    height={800}
                    className="object-fit-cover object-center"
                />
            </div>

            <div className="cat-grid-button text-white bg-dark">
                <div className="cat_grid_item__title">
                    {item.attributes.category.title}
                </div>
            </div>
        </Link>
    );
};

export default CategoriesGridItem;