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