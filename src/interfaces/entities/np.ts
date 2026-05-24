export type NPAreaObject = {
    ref: string;
    name: string;
};

export type NPCityObject = {
    ref: string;
    name: string;
    settlement_type: string;
};

export type NPWarehouseObject = {
    name: string;
    ref: string;
    type: string;
    address: string;
};

export type NPStreetObject = {
    SettlementRef: string;
    SettlementStreetRef: string;
    SettlementStreetDescription: string;
    Present: string;
    StreetsType: string;
    StreetsTypeDescription: string;
}

export type NPLocalityObject = {
    Ref: string;
    SettlementType: string;
    Description: string;
    SettlementTypeDescription: string;
    AreaDescription: string;
}