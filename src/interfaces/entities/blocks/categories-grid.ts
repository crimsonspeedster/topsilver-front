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
};