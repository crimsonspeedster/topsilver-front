"use client";

import React from "react";
import {MediaObject} from "@interfaces/common";
import FallbackImage from '@assets/images/fallback.png';


const HeaderTag = (
    {
        tag,
        title,
    }
    :
    {
        tag: string,
        title: string,
    }
) => {
    switch (tag) {
        case 'h2':
            return (<h2 className="fs-20 fw-medium">{title}</h2>);
        case 'h3':
            return (<h3 className="fs-20 fw-medium">{title}</h3>);
        case 'h4':
            return (<h4 className="fs-20 fw-medium">{title}</h4>);
        case 'h5':
            return (<h5 className="fs-20 fw-medium">{title}</h5>);
        case 'h6':
            return (<h6 className="fs-20 fw-medium">{title}</h6>);
        default:
            return (<h2 className="fs-20 fw-medium">{title}</h2>);
    }
}

const PageBanner = ({
    title,
    description,
    media,
    header_tag="h2"
} : {
    title: string,
    description?: string|null,
    media?: MediaObject|null,
    header_tag?: string,
}) => {
    return (
        <div
            style={{
                backgroundImage: `url(${media ? media.url : FallbackImage.src})`,
                backgroundPosition: 'center',
            }}
            className="position-relative"
        >
            <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>

            <div className="container">
                <div className="text-white text-center py-5 position-relative">
                    <HeaderTag
                        tag={header_tag}
                        title={title}
                    />

                    {
                        description &&
                        <div
                            className="fs-14"
                            dangerouslySetInnerHTML={{__html: description}}
                        />
                    }
                </div>
            </div>
        </div>
    )
}
export default PageBanner;