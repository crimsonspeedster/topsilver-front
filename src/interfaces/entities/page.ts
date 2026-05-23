export type PageObject = {
    id: number;
    title: string;
    content: LayoutObject[];
    short_description: string | null;
};

export type LayoutBaseObject = {
    key: string;
}

export type LayoutObject =
    | (LayoutBaseObject & {})

export type PagePageEntityObject = {
    type: 'page';
    entity: PageObject;
}