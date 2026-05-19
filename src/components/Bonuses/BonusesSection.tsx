"use client";

import {useTranslations} from "next-intl";
import BonusesForm from "@src/components/Bonuses/BonusesForm";
import Bonuses from "@src/components/Bonuses/Bonuses";
import {BonusesObject} from "@interfaces/entities/bonuses";


type Props = {
    bonuses: BonusesObject|null;
}

const BonusesSection = (
    {
        bonuses,
    }: Props
) => {
    const tCart = useTranslations('Cart');

    return (
        <div>
            <h6>{tCart('bonuses')}: ({bonuses?.active_total ?? '0'})</h6>

            <BonusesForm
                bonuses={bonuses}
            />

            <Bonuses />
        </div>
    );
}

export default BonusesSection;