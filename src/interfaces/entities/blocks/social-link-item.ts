import {LayoutBaseObject} from "@interfaces/entities/page";

export type SocialLinkItemLayoutObject =
    | (LayoutBaseObject & {
        layout: 'SocialLinkItem';
        attributes: SocialLinkObject,
    })

export type SocialLinkObject = {
    link: string;
    image: string;
}