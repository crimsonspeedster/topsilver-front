'use client';

import {BannersItemObject} from "@interfaces/entities/blocks/banners";
import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";


const BannersItem = ({item}: {item: BannersItemObject}) => {
    const tCommon = useTranslations('Common');
    let layoutClasses = 'position-absolute d-flex';
    const layoutSchemeClasses = item.text_color === 'white' ? 'text-white' : '';

    switch (item.type) {
        case 'bottom':
            layoutClasses += ' start-0 start-0 end-0 top-0 bottom-0 align-items-end m-4 mb-5';
            break;
        case 'center':
            layoutClasses += ' top-50 start-50 translate-middle align-items-center text-center';
            break;
        default:
            break;
    }

    const content = (
        <>
            <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={300}
                className="hover-zoom-img object-fit-cover object-center"
            />

            <div className={layoutClasses}>
                <div className={layoutSchemeClasses}>
                    {item.overhead && (
                        <p className="fs-16 fw-medium mb-2">{item.overhead}</p>
                    )}

                    <h2 className="fs-36 font-playfair fw-semibold mb-2">
                        {item.title}
                    </h2>

                    {item.subtitle && (
                        <p className="mb-2">{item.subtitle}</p>
                    )}

                    {item.show_button && (
                        <p className="fw-normal btn btn-primary font-futura mb-0 btn_icon_true d-inline-block position-relative fs-14">
                            {tCommon('shop_now')}
                        </p>
                    )}
                </div>
            </div>
        </>
    );

    if (item.link_type === 'external') {
        return (
            <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer noindex"
                className="position-relative hover-zoom d-block"
            >
                {content}
            </a>
        );
    }

    return (
        <Link
            href={item.link}
            className="position-relative hover-zoom d-block"
        >
            {content}
        </Link>
    );
}

export default BannersItem;