"use client";

import React from "react";
import {MediaObject} from "@interfaces/common";
import FallbackImage from '@assets/images/fallback.png';


const WomenColting = ({
    title,
    description,
    media,
} : {
    title: string,
    description?: string|null,
    media: MediaObject|null,
}) => {
    return (
        <React.Fragment>
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
                        <h1 className="fs-20 fw-medium">{title}</h1>

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
        </React.Fragment>
    )
}
export default WomenColting