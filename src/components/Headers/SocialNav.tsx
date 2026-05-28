import Image from "next/image";
import {SocialLinkObject} from "@interfaces/entities/settings";


type Props = {
    links: SocialLinkObject[];
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
                        href={link.link}
                        className="facebook text-black fs-14 mx-1"
                    >
                        {
                            link.type === 'image' ?
                                <Image
                                    src={link.image ?? ''}
                                    alt="logo"
                                    width={24}
                                    height={24}
                                />
                                :
                                <span>{link.title}</span>
                        }
                    </a>
                ))
            }
        </div>
    );
}

export default SocialNav;