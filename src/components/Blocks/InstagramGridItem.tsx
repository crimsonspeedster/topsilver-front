import Image from "next/image";
import {InstagramPostObject} from "@interfaces/entities/instagram";
import React from "react";


const InstagramGridItem = ({item} : {item: InstagramPostObject}) => {
    return (
        <a
            href={item.link}
            className="overflow-hidden img-zoom"
            rel="noopener noreferrer noindex"
            target="_blank"
        >
            {
                item.video ?
                    <video
                        controls={false}
                        autoPlay={true}
                        muted={true}
                        poster={item.media.url}
                        loop
                        width={350}
                        height={350}
                        playsInline
                        className="object-fit-cover w-100 object-center"
                    >
                        <source
                            src={item.video.url}
                        />
                    </video>
                    :
                    <Image
                        src={item.media.url}
                        alt={item.caption ?? 'instagram image'}
                        className="object-fit-cover w-100 object-center"
                        width={350}
                        height={350}
                    />
            }
        </a>
    );
}

export default InstagramGridItem;