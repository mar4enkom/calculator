interface ApiResponseBase {
    success: boolean;
}

export interface ApiSuccessResponse<T> extends ApiResponseBase {
    data: T;
}

export interface ApiFailResponse<T> extends ApiResponseBase {
    errors: T;
}

export type ErrorBody = Array<{
    code: string;
    message: string;
}>;

export type ServerFailResponse = ApiFailResponse<ErrorBody>;
