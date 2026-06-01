import {LayoutBaseObject} from "@interfaces/entities/page";

export type BannersObject = {
    banners: BannersItemLayoutObject[];
    layout_type: '2x2' | '3x3';
};

export type BannersItemObject = {
    text_color: 'white' | 'black';
    show_button: boolean;
    overhead: string|null;
    subtitle: string|null;
    title: string;
    link: string;
    link_type: 'external' | 'internal';
    image: string;
    type: 'bottom' | 'center';
}

export type BannersLayoutObject = {
    layout: 'Banners';
    attributes: BannersObject;
}

export type BannersItemLayoutObject =
    | (LayoutBaseObject & {
        layout: 'BannersItem';
        attributes: BannersItemObject;
    })