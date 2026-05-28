import Cookies from 'js-cookie';
import {CityObject} from "@interfaces/entities/city";
import {SelectGroup, SelectOption} from "@interfaces/layouts/formField";
import {CartObject} from "@interfaces/entities/cart";
import {UserObject} from "@interfaces/entities/user";
import {ShopsPickupObject} from "@interfaces/entities/shops";
import {SettingsPromiseObject} from "@interfaces/entities/settings";

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

export const groupShopsByRegion = (shops: ShopsPickupObject[]): SelectGroup[] => {
    const grouped: Record<
        string,
        { label: string; options: SelectOption[] }
    > = {};

    shops.forEach((shop) => {
        const regionName = shop.city.region.name;

        const label = `${shop.title} (${shop.address}) (${shop.city.name})`;

        if (!grouped[regionName]) {
            grouped[regionName] = {
                label: regionName,
                options: [],
            };
        }

        grouped[regionName].options.push({
            label,
            value: shop.id,
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

export const getUserFormData = (user: UserObject | null) => ({
    first_name: user?.profile?.name ?? '',
    middle_name: user?.profile?.middle_name ?? '',
    last_name: user?.profile?.surname ?? '',
    phone: user?.phone ?? '',
    email: user?.email ?? '',
});

export const searchSettingByKey = (key: string, settings: SettingsPromiseObject[]) => {
    const settingObject = settings.find(setting => setting.key === key);

    if (!settingObject) {
        return undefined;
    }

    switch (settingObject.type) {
        case 'image':
            return settingObject.value.image;

        case 'text':
            return settingObject.value.text;

        case 'social_links':
            return settingObject.value.data;

        default:
            return undefined;
    }
}