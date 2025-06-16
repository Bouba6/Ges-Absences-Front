export interface RestResponse<T> {
    status: number;
    results: T;
    currentPage?: number;
    totalPages?: number;
    totalItems?: number;
    first?: boolean;
    last?: boolean;
    pages?: number[];
    type: string;
}