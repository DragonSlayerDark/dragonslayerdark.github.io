export abstract class StrapiPayloadEntity<T> {
    meta: Meta;
    data: EntityStrapi<T>[] | EntityStrapi<T>;
}

interface Meta {
    pagination: Pagination;
}

interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface EntityStrapi<T> {
    id: number;
    attributes: T;
}
