import {HTMLBlockObject} from "@interfaces/entities/htmlblock";
import {LayoutBaseObject} from "@interfaces/entities/page";

export type MenuItemObject = {
    id: number;
    title: string;
    type: 'custom' | 'entity';
    url: string;
    order: number;
    use_html_blocks: boolean;
    html_block?: HTMLBlockObject | null,
    children?: MenuItemObject[];
};

export type MenuObject = {
    id: number;
    name: string;
    items: MenuItemObject[];
    location: MenuLocationObject;
};

export type MenuLocationObject = {
    id: number;
    name: string;
};

export type MegaMenuLayoutObject = {
    layout: 'MegaMenu';
    attributes: MegaMenuObject;
}

export type MegaMenuObject = {
    left_part: (LayoutBaseObject & MenuElementLayoutObject)[] | (LayoutBaseObject & MenuImageLayoutObject)[];
    right_part: (LayoutBaseObject & MenuElementLayoutObject)[] | (LayoutBaseObject & MenuImageLayoutObject)[];
}

export type MenuElementLayoutObject = {
    layout: 'MenuItem';
    attributes: MenuElementObject;
}

export type MenuImageLayoutObject = {
    layout: 'MenuImage';
    attributes: MenuImageObject;
}

export type MenuElementObject = {
    title: string | undefined;
    menu_items: MenuItemObject[];
}

export type MenuImageObject = {
    title: string | undefined;
    url: string;
    type: 'custom' | 'entity';
    image: string;
}