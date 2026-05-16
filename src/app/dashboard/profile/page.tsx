import {getUserSSR} from "@lib/auth/getUser.server";
import {redirect} from "next/navigation";
import ProfileClient from "@src/components/Dashboard/ProfileClient";
import {getCitiesSSR, getRegionsSSR} from "@lib/getCities.server";
import ProfilePasswordClient from "@src/components/Dashboard/ProfilePasswordClient";

export default async function Profile () {
    const user = await getUserSSR();

    if (!user) {
        redirect('/');
    }

    const cities = await getCitiesSSR();

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