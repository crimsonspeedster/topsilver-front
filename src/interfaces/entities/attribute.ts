export type attributeObject = {
    id: number,
    title: string,
    slug: string,
    type: string,
    terms: attributeTermObject[],
}

export type attributeTermObject = {
    id: number,
    title: string,
    slug: string,
    meta_value: string|null,
}

export type attributeTermFunctionalityObject = attributeTermObject & {
    selected: boolean,
    count: number,
}