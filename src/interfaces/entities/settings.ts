import {SocialLinkItemLayoutObject} from "@interfaces/entities/blocks/social-link-item";
import {ContactItemLinkLayoutObject, ContactItemTextLayoutObject} from "@interfaces/entities/blocks/contact-item";

export type SettingsPromiseObject =
    | ImageSettingsObject
    | TextSettingsObject
    | ContactsSettingsObject
    | SocialLinksSettingsObject;

export type SettingBaseObject = {
    key: string;
};

export type ImageSettingsObject =
    SettingBaseObject & {
        type: 'image';
        value: {
            image: string;
        }
    };

export type TextSettingsObject =
    SettingBaseObject & {
        type: 'text';
        value: {
            text: string;
        }
    };

export type SocialLinksSettingsObject =
    SettingBaseObject & {
        type: 'social_links';
        value: {
            data: SocialLinkItemLayoutObject[];
        }
    };

export type ContactsSettingsObject =
    SettingBaseObject & {
        type: 'contacts';
        value: {
            data: (ContactItemTextLayoutObject | ContactItemLinkLayoutObject)[];
        }
    };