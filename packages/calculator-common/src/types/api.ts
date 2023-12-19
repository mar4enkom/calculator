import {CalculateExpressionReturnType} from "./calculationResult";

export type ApiResponse<T = any> = {
    result: T
}

export type CalculateExpressionRequest = {
    expression: string;
};

export type CalculateExpressionResult = CalculateExpressionReturnType;
export type CalculateExpressionResponse = ApiResponse<CalculateExpressionResult>;
