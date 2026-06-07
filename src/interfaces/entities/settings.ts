import {SocialLinkItemLayoutObject} from "@interfaces/entities/blocks/social-link-item";
import {ContactItemLinkLayoutObject, ContactItemTextLayoutObject} from "@interfaces/entities/blocks/contact-item";
import {AdvantagesLayoutObject} from "@interfaces/entities/blocks/advantages";
import {LayoutBaseObject} from "@interfaces/entities/page";


export type SettingsPromiseObject =
    | ImageSettingsObject
    | TextSettingsObject
    | ContactsSettingsObject
    | ProductAdvantagesSettingsObject
    | RelationPageSettingsObject
    | SocialLinksSettingsObject;

export type SettingBaseObject = {
    key: string;
};

export type ImageSettingsObject =
    SettingBaseObject & {
        type: 'image';
        value: {
            data: string;
        }
    };

export type TextSettingsObject =
    SettingBaseObject & {
        type: 'text';
        value: {
            data: string;
        }
    };

export type ProductAdvantagesSettingsObject =
    SettingBaseObject & {
        type: 'product_advantages';
        value: {
            data: (LayoutBaseObject & AdvantagesLayoutObject);
        }
    };

export type SocialLinksSettingsObject =
    SettingBaseObject & {
        type: 'social_links';
        value: {
            data: SocialLinkItemLayoutObject[];
        }
    };

export type RelationPageSettingsObject =
    SettingBaseObject & {
        type: 'relation_page';
        value: {
            data: {
                model_id: number;
                model_slug: string;
            }
        }
    }

export type ContactsSettingsObject =
    SettingBaseObject & {
        type: 'contacts';
        value: {
            data: (ContactItemTextLayoutObject | ContactItemLinkLayoutObject)[];
        }
    };