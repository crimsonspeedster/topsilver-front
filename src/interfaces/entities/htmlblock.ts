import {LayoutObject} from "@interfaces/entities/page";

export type HTMLBlockObject = {
    id: number;
    title: string;
    blocks: LayoutObject[];
};