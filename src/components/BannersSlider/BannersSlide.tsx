import {BannersSliderItemObject} from "@interfaces/entities/blocks/banners-slider";
import Image from "next/image";
import BannersButton from "@src/components/BannersSlider/BannersButton";


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
        <div className="position-relative banners__slide d-flex align-items-center">
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

                            <BannersButton
                                button={item.button?.[0]?.attributes}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannersSlide;