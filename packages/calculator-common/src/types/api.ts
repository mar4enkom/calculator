import {CalculateExpressionReturnType, CalculationErrors, CalculationResult} from "./modules/calculator";

interface ApiResponseBase {
    success: boolean;
}

export interface ApiSuccessResponse<T> extends ApiResponseBase {
    data: T;
}

export interface ApiFailResponse<T> extends ApiResponseBase {
    errors: T;
}

type ApiResponse<S, F> = ApiSuccessResponse<S> | ApiFailResponse<F>;

export type CalculateExpressionRequest = {
    expression: string;
};

export type ErrorBody = Array<{
    code: string;
    message: string;
}>;

export type CalculateExpressionResult = CalculateExpressionReturnType;
export type CalculateExpressionResponse = ApiResponse<CalculationResult["result"], CalculationErrors["errors"]>;
