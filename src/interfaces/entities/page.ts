import {MediaObject} from "@interfaces/common";
import {CategoriesGridLayoutObject} from "@interfaces/entities/blocks/categories-grid";
import {ProductsGridLayoutObject} from "@interfaces/entities/blocks/products-grid";
import {AdvantagesLayoutObject} from "@interfaces/entities/blocks/advantages";
import {BannersLayoutObject} from "@interfaces/entities/blocks/banners";
import {ContentBlockLayoutObject} from "@interfaces/entities/blocks/content-block";
import {InstagramGridLayoutObject} from "@interfaces/entities/blocks/instagram-grid";
import {ProductGridWithTabsLayoutObject} from "@interfaces/entities/blocks/products-grid-with-tabs";
import {BannersSliderLayoutObject} from "@interfaces/entities/blocks/banners-slider";
import {LatestPromotionsLayoutObject} from "@interfaces/entities/blocks/latest-promotions";
import {FaqLayoutObject} from "@interfaces/entities/blocks/faq";
import {SeoBlockObject} from "@interfaces/entities/seo";


export type ContentEntityObject = {
    id: number;
    title: string;
    blocks: LayoutObject[];
    short_description: string | null;
    seo_block: SeoBlockObject | null;
    media: MediaObject | null;
    banner: MediaObject | null;
    is_home_page: boolean;
}

export type PageObject = ContentEntityObject;

export type LayoutBaseObject = {
    key: string;
}

export type LayoutObject =
    | (LayoutBaseObject & CategoriesGridLayoutObject)
    | (LayoutBaseObject & ProductsGridLayoutObject)
    | (LayoutBaseObject & AdvantagesLayoutObject)
    | (LayoutBaseObject & BannersSliderLayoutObject)
    | (LayoutBaseObject & BannersLayoutObject)
    | (LayoutBaseObject & ContentBlockLayoutObject)
    | (LayoutBaseObject & InstagramGridLayoutObject)
    | (LayoutBaseObject & ProductGridWithTabsLayoutObject)
    | (LayoutBaseObject & FaqLayoutObject)
    | (LayoutBaseObject & LatestPromotionsLayoutObject);

export type PagePageEntityObject = {
    type: 'page';
    entity: PageObject;
}