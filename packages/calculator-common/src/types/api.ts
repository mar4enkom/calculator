interface ApiResponseBase {
    success: boolean;
}

export interface ApiSuccessResponse<T = any> extends ApiResponseBase {
    data: T;
}

export interface ApiFailResponse<T> extends ApiResponseBase {
    errors: T;
}

export type CalculateExpressionPayload = {
    expression: string;
};

export type ErrorBody = Array<{
    code: string;
    message: string;
}>;

export type CalculationSuccessResponse = ApiSuccessResponse<string | undefined>;
export type ServerFailResponse = ApiFailResponse<ErrorBody>;
