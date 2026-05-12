import {UserObject} from "@interfaces/entities/user";

export type ReviewObject = {
    id: number,
    user: UserObject,
    comment: string,
    rating: number,
    created_at: string,
    has_replies: boolean,
};