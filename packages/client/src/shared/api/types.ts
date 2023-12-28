export type HttpQueryResult = {};

export type QueryResult<T, E> =
    | { data: T, errors: undefined }
    | { data: undefined, errors: E }