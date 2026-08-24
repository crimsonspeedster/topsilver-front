import {CityObject} from "@interfaces/entities/city";


export type UserObject = {
    email: string|null,
    phone: string,
    email_verified: boolean,
    profile: ProfileObject,
}

export type ProfileObject = {
    name: string,
    surname: string,
    middle_name: string|null,
    about: string|null,
    sex: string|null,
    dob: string|null,
    city: CityObject,
}