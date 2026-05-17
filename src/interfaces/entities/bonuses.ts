export type BonusesObject = {
    active_total: string,
    active_bonuses: BonusObject[],
    future_bonuses: BonusObject[],
}

export type BonusObject = {
    amount: string,
    accrual_from: string,
    available_from: string,
    expires_at: string,
};
