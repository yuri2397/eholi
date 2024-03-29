export abstract class BaseModel {
    id: any;

    created_at?: Date | string;
    updated_at?: Date | string;

    loading?: boolean;
    created?: boolean;
    deleted?: boolean;
    updated?: boolean;
    searched?: boolean;
    success?: boolean;
    danger?: boolean;

    active?: boolean;
}

export interface Paginate<T> {
    current_page: number;
    data: Array<T>;
    first_page_url: string;
    from: number;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
    last_page: number;
    links: any[];
}
