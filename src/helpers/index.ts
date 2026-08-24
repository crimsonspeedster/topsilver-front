import Cookies from 'js-cookie';
import {CityObject} from "@interfaces/entities/city";
import {SelectGroup, SelectOption} from "@interfaces/layouts/formField";
import {CartObject} from "@interfaces/entities/cart";
import {UserObject} from "@interfaces/entities/user";
import {ShopsPickupObject} from "@interfaces/entities/shops";
import {SettingsPromiseObject} from "@interfaces/entities/settings";
import {WishlistObject} from "@interfaces/entities/wishlist";
import {OrderItemProductVariantAttributesObject} from "@interfaces/entities/orders";

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
    promotion_messages: [],
};

export const emptyWishlistObject: WishlistObject = {
    items: [],
    items_count: 0,
};

export const getUserFormData = (user: UserObject | null) => ({
    first_name: user?.profile?.name ?? '',
    middle_name: user?.profile?.middle_name ?? '',
    last_name: user?.profile?.surname ?? '',
    phone: user?.phone ? '+' + user.phone : '',
    email: user?.email ?? '',
});

export const searchSettingByKey = (key: string, settings: SettingsPromiseObject[]) => {
    const settingObject = settings.find(setting => setting.key === key);

    if (!settingObject) {
        return undefined;
    }

    return settingObject.value.data;
}

export const getFormattedProductAttributesString = (array: OrderItemProductVariantAttributesObject[]): string => {
    return array.map(
        variant =>
            `${variant.attribute_name}: ${variant.attribute_value}`,
    )
        .join(', ');
}

export const normalizePhone = (phone: string): string => {
    const value = phone.replace(/\D/g, '');

    if (value.startsWith('0') && value.length === 10) {
        return `38${value}`;
    }

    if (value.startsWith('380') && value.length === 12) {
        return value;
    }

    return value;
};