import {LayoutBaseObject} from "@interfaces/entities/page";

export type BannersSliderLayoutObject = {
    layout: 'BannersSlider';
    attributes: BannersSliderObject;
}

export type BannersSliderObject = {
    slides: (
        LayoutBaseObject & {
            layout: 'BannersSliderItem';
            attributes: BannersSliderItemObject;
        }
    )[];
}

export type BannersSliderItemObject = {
    text_color: 'white' | 'black';
    position: 'left' | 'center';
    overhead?: string|null;
    title: string;
    title_tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    image: string;
    button: (
        LayoutBaseObject & {
            layout: 'Button';
            attributes: ButtonObject;
        }
    );
}

export type ButtonObject = {
    title: string;
    link: string;
    link_type: 'external' | 'internal';
}