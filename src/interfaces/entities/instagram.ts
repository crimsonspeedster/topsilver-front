import {MediaObject} from "@interfaces/common";


export type InstagramPostObject = {
    id: number;
    type: 'image' | 'video';
    link: string;
    media: MediaObject;
}