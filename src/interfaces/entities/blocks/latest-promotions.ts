import {TaxonomyCollectionObject} from "@interfaces/entities/taxonomy";


export type LatestPromotionsObject = {
    title: string;
    description: string|null;
    promotions: TaxonomyCollectionObject[];
}

export type LatestPromotionsLayoutObject = {
    layout: 'LatestPromotions';
    attributes: LatestPromotionsObject;
}