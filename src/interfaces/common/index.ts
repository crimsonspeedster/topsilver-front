export type PaginationObject = {
    total_items: number,
    total_pages: number,
    current_page: number,
    per_page: number,
    has_more_pages: boolean
}

export type MediaObject = {
    id: number,
    url: string,
}
