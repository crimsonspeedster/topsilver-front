import Link from "next/link";
import Image from "next/image";
import {MenuImageObject} from "@interfaces/entities/menu";

const MenuImage = (props: MenuImageObject) => {
    const content = (
        <>
            <Image
                src={props.image}
                alt={props.title ?? 'icon'}
                width={390}
                height={350}
                className="position-absolute z-1 top-0 start-0 w-100 h-100 object-center object-fit-cover"
            />

            {
                props.title &&
                <div className="cat-grid-button bg-white text-body z-2">
                    <div className="cat_grid_item__title">{props.title}</div>
                </div>
            }
        </>
    );

    const linkClassName: string = 'd-block position-relative cat_grid_item mega_menu_image overflow-hidden';

    if (props.type === 'custom') {
        return (
            <a
                href={props.url}
                className={linkClassName}
                style={{ height: "350px" }}
            >
                {content}
            </a>
        );
    }

    return (
        <Link
            href={props.url}
            className={linkClassName}
            style={{ height: "350px" }}
        >
            {content}
        </Link>
    );
}

export default MenuImage;