import Image from "next/image";
import {InstagramPostObject} from "@interfaces/entities/instagram";


const InstagramGridItem = ({item} : {item: InstagramPostObject}) => {
    return (
        <a
            href={item.link}
            className="overflow-hidden img-zoom"
            rel="noopener noreferrer noindex"
            target="_blank"
        >
            <Image
                src={item.media.url}
                alt="instagram image"
                className="w-100 img-fluid h-100"
                width={350}
                height={350}
            />
        </a>
    );
}

export default InstagramGridItem;