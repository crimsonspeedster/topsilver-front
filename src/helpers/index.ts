import Cookies from 'js-cookie';
import {CityObject} from "@interfaces/entities/city";
import {SelectGroup, SelectOption} from "@interfaces/layouts/formField";

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