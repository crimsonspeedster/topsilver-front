export type MenuItemObject = {
    id: number;
    title: string;
    type: 'custom' | 'entity';
    url: string;
    order: number;
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