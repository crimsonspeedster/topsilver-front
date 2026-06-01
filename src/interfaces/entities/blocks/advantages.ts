import {LayoutBaseObject} from "@interfaces/entities/page";

export type AdvantagesObject = {
    blocks: AdvantageLayoutObject[];
};

export type AdvantageObject = {
    image: string;
    title: string;
    description: string;
};

export type AdvantagesLayoutObject = {
    layout: 'Advantages';
    attributes: AdvantagesObject;
};

export type AdvantageLayoutObject =
    | (LayoutBaseObject & {
         layout: 'AdvantageItem';
         attributes: AdvantageObject;
    });