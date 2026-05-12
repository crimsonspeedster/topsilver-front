import {MediaObject} from "@interfaces/common";
import Image from "next/image";
import FallbackImage from '@assets/images/fallback.png';


type Props = {
    media: MediaObject|null;
    title: string;
};

const ProductTopImage = (
    {
        title,
        media,
    }: Props
) => {
    return (
        <div className="g-2 pe-xl-4">
            <Image
                src={media?.url ?? FallbackImage}
                alt={title}
                width={900}
                height={1148}
                className="object-fit-cover w-100 h-100 object-center"
            />
        </div>
    );
}

export default ProductTopImage;