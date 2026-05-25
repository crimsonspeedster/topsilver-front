import {InstagramPostObject} from "@interfaces/entities/instagram";

export type InstagramGridObject = {
    title: string;
    posts: InstagramPostObject[];
}

export type InstagramGridLayoutObject = {
    layout: 'InstagramGrid';
    attributes: InstagramGridObject;
}