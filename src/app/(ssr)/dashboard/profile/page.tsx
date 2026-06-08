import ProfileClient from "@src/components/Dashboard/ProfileClient";
import {getCitiesSSR} from "@lib/getCities.server";
import ProfilePasswordClient from "@src/components/Dashboard/ProfilePasswordClient";
import {Metadata} from "next";
import {getUserSSR} from "@lib/auth/getUser.server";
import {redirect} from "next/navigation";


export default async function Profile () {
    const cities = await getCitiesSSR();
    const user = await getUserSSR();

    if (!user) {
        redirect('/');
    }

    return (
        <>
            <ProfileClient
                user={user}
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