import {CalculateExpressionReturnType} from "./calculationResult";

export type ApiResponse<T> = {
    result: T
}

export type CalculateExpressionRequest = {
    expression: string;
};

export type CalculateExpressionResponse = ApiResponse<CalculateExpressionReturnType>;
