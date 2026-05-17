import ProfileClient from "@src/components/Dashboard/ProfileClient";
import {getCitiesSSR} from "@lib/getCities.server";
import ProfilePasswordClient from "@src/components/Dashboard/ProfilePasswordClient";
import {Metadata} from "next";


export default async function Profile () {
    const cities = await getCitiesSSR();

    return (
        <>
            <ProfileClient
                cities={cities}
            />

            <ProfilePasswordClient />
        </>
    );
}

export const metadata: Metadata = {
    title: 'Профіль',
    description: 'Редагування особистих даних користувача',
    robots: {
        index: false,
        follow: false,
    },
};