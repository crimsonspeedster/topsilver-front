import {CityObject} from "@interfaces/entities/city";

export type ShopsObject = {
    id: number;
    name: string;
    city: CityObject,
    address: string;
    address_link: string;
    phone: string;
    time_working: string;
}