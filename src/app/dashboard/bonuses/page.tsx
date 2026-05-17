import {getUserBonusesSSR} from "@lib/auth/getUser.server";
import ProfileBonuses from "@src/components/Dashboard/ProfileBonuses";
import {Metadata} from "next";

export default async function Bonuses () {
    const bonuses = await getUserBonusesSSR();

    return (
        <ProfileBonuses
            active_total={bonuses?.active_total ?? 0}
            active_bonuses={bonuses?.active_bonuses ?? []}
            future_bonuses={bonuses?.future_bonuses ?? []}
        />
    );
}

export const metadata: Metadata = {
    title: 'Бонуси',
    description: 'Ваш бонусний баланс та історія нарахувань',
    robots: {
        index: false,
        follow: false,
    },
};