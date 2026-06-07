import {LayoutBaseObject} from "@interfaces/entities/page";

export type FaqObject = {
    blocks: FaqItemLayoutObject[];
}

export type FaqItemLayoutObject = (
    LayoutBaseObject & {
        layout: 'FaqBlockItem';
        attributes: FaqItemObject;
    }
);

export type FaqLayoutObject = {
    layout: 'FaqBlock';
    attributes: FaqObject;
}

export type FaqItemObject = {
    title: string;
    content: string;
}