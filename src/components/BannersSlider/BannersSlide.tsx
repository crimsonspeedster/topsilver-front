import {BannersSliderItemObject} from "@interfaces/entities/blocks/banners-slider";
import Image from "next/image";
import Link from "next/link";


type Props = {
    item: BannersSliderItemObject;
};

const BannersSlide = (
    {
        item
    }: Props
) => {
    const TitleTag = item.title_tag;

    return (
        <div className="position-relative min-vh-100 d-flex align-items-center">
            <Image
                src={item.image}
                alt={item.title}
                width={1920}
                height={850}
                className="object-fit-cover object-center w-100 position-absolute top-0 left-0 h-100"
            />

            <div className="container position-relative">
                <div
                    className={`row ${item.position === 'center' ? 'justify-content-center' : ''}`}
                >
                    <div className="col-lg-8">
                        <div
                            className={`content ${item.text_color === 'white' ? 'text-white' : ''} ${item.position === 'center' ? 'text-center' : ''}`}
                        >
                            {
                                item.overhead &&
                                <p className="fw-medium fs-18 mb-2">{item.overhead}</p>
                            }

                            <TitleTag
                                className="fs-50 fw-semibold mb-4"
                            >
                                {item.title}
                            </TitleTag>

                            {
                                item.button.attributes.link_type === 'internal' ?
                                    <Link
                                        className="btn btn-dark rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4"
                                        href={item.button.attributes.link}
                                    >
                                        {item.button.attributes.title}
                                    </Link>
                                    :
                                    <a
                                        rel="noopener noreferrer noindex"
                                        target="_blank"
                                        className="btn btn-dark rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4"
                                        href={item.button.attributes.link}
                                    >
                                        {item.button.attributes.title}
                                    </a>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannersSlide;