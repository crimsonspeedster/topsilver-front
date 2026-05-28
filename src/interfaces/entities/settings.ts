export type SettingsPromiseObject =
    | ImageSettingsObject
    | TextSettingsObject
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
            data: SocialLinkObject[];
        }
    };

export type SocialLinkObject = {
    link: string;
    image?: string;
    title?: string;
    type: 'image' | 'text';
}

export type ContactItemBaseObject = {
    title: string;
    image?: string;
};

export type ContactItemLinkObject = {
    type: 'link';
    link: string;
};

export type ContactItemTextObject = {
    type: 'text';
};

export type ContactItemObject =
    ContactItemBaseObject & (
        ContactItemLinkObject | ContactItemTextObject
    );