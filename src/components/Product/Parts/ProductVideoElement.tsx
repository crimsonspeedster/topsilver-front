import {VideoObject} from "@interfaces/common";
import React from "react";


type Props = Pick<
    VideoObject,
    | 'type'
    | 'link'
>

const ProductVideoElement = (
    {
        type,
        link,
    }: Props
) => {
    if (type === 'external') {
        return (
            <div
                className="iframe-container"
                style={{ width: "100%", height: "500px" }}
            >
                <iframe
                    width="560"
                    src={link}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    loading="lazy"
                    allowFullScreen={true}
                />
            </div>
        )
    }

    return (
        <video
            controls
            autoPlay={false}
            loop
            style={{ width: "100%" }}
            playsInline
            className="object-center object-fit-cover w-100 h-100"
        >
            <source
                src={link}
            />
        </video>
    );
}

export default ProductVideoElement;