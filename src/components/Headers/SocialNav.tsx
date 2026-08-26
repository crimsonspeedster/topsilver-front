import Image from "next/image";
import {SocialLinkItemLayoutObject} from "@interfaces/entities/blocks/social-link-item";


type Props = {
    links: SocialLinkItemLayoutObject[]
    className?: string;
};

const SocialNav = (
    {
        links,
        className,
    }: Props
) => {
    return (
        <div className={className}>
            {
                links.map((link, index) => (
                    <a
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer noindex"
                        href={link.attributes.link}
                        className="facebook text-black fs-14 mx-1"
                    >
                        <Image
                            src={link.attributes.image}
                            alt="logo"
                            className="object-center object-fit-contain"
                            width={24}
                            height={24}
                        />
                    </a>
                ))
            }
        </div>
    );
}

export default SocialNav;