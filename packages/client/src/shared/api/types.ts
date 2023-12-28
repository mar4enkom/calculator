import {ErrorBody, ServerFailResponse} from "@calculator/common";

export type HttpQueryResult<T, E = ServerFailResponse> =
    | { data: T, errors: undefined }
    | { data: undefined, errors: E }

export type QueryResult<T, E = ErrorBody> =
    | { data: T, errors: undefined }
    | { data: undefined, errors: E }