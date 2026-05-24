import {CityObject} from "@interfaces/entities/city";
import {MediaObject, PaginationObject} from "@interfaces/common";
import {ContentEntityObject} from "@interfaces/entities/page";


export type ShopsPickupObject = {
    id: number;
    title: string;
    address: string;
    city: CityObject;
}

export type ShopsObject =
    | (ContentEntityObject & {
        address: string;
        address_link: string;
        phone: string;
        time_working: string;
    });

export type ShopsCollectionObject = {
    id: number;
    title: string;
    slug: string;
    address: string;
    address_link: string;
    phone: string;
    time_working: string;
    media: MediaObject|null;
};

export type ShopsPromiseObject = {
    shops: ShopsCollectionObject[],
    pagination: PaginationObject,
}

export type ShopPageEntityObject = {
    type: 'shop';
    entity: ShopsObject;
}