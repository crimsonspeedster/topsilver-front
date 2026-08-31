import {MediaObject} from "@interfaces/common";


export type InstagramPostObject = {
    id: number;
    type: 'IMAGE' | 'VIDEO';
    link: string;
    media: MediaObject;
    caption: string | null;
    video: MediaObject | null;
}