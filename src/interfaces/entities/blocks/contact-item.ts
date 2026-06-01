import {LayoutBaseObject} from "@interfaces/entities/page";

export type ContactItemTextLayoutObject =
    | (LayoutBaseObject & {
    layout: 'SocialLinkItem';
    attributes: ContactItemBaseObject,
});

export type ContactItemLinkLayoutObject =
    | (LayoutBaseObject & {
    layout: 'ContactItemLink';
    attributes: ContactItemLinkObject,
});

export type ContactItemBaseObject = {
    title: string;
    image?: string | null;
};

export type ContactItemLinkObject = {
    title: string;
    image?: string | null;
    link: string;
};