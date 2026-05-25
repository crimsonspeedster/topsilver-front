import {TaxonomyCollectionObject} from "@interfaces/entities/taxonomy";
import {LayoutBaseObject} from "@interfaces/entities/page";


export type CategoriesGridLayoutObject = {
    layout: 'CategoriesGrid';
    attributes: CategoriesGridObject;
}

export type CategoriesGridObject = {
    categories: CategoriesGridItemLayoutObject[];
};

export type CategoriesGridItemLayoutObject =
    | (LayoutBaseObject & {
        layout: 'CategoriesGridItem';
        attributes: CategoriesGridItemObject;
    });

export type CategoriesGridItemObject = {
    image: string;
    category: TaxonomyCollectionObject;
    position: 1 | 2 | 3 | 4 | 5;
};

export const GRID_LAYOUT_MAP: Record<number, { wrapper: string; col: string }> = {
    1: {
        wrapper: 'col-md-3',
        col: 'col-6 col-md-12',
    },
    2: {
        wrapper: 'col-md-6',
        col: 'col-12',
    },
    3: {
        wrapper: 'col-md-3',
        col: 'col-12',
    },
    4: {
        wrapper: 'col-lg-12 d-md-none',
        col: 'col-12',
    },
    5: {
        wrapper: 'col-md-3',
        col: 'col-12',
    },
};