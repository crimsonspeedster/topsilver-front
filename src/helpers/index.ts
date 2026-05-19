import Cookies from 'js-cookie';
import {CityObject} from "@interfaces/entities/city";
import {SelectGroup, SelectOption} from "@interfaces/layouts/formField";
import {CartObject} from "@interfaces/entities/cart";

export const getWishlist = (): number[] => {
    const wishlist = Cookies .get('wishlist');

    return wishlist ? JSON.parse(wishlist) : [];
};

export const groupCitiesByRegion = (cities: CityObject[]): SelectGroup[] => {
    const grouped: Record<
        string,
        { label: string; options: SelectOption[] }
    > = {};

    cities.forEach((city) => {
        const regionName = city.region.name;

        if (!grouped[regionName]) {
            grouped[regionName] = {
                label: regionName,
                options: [],
            };
        }

        grouped[regionName].options.push({
            label: city.name,
            value: city.id,
        });
    });

    return Object.values(grouped);
};

export const emptyCartObject: CartObject = {
    items: [],
    subtotal: "0.00",
    total: "0.00",
    bonuses_used: 0,
    total_formatted: "₴0",
    subtotal_formatted: "₴0",
    coupon: null,
    certificates: [],
    items_count: 0,
    total_qty: 0,
}