import {
    CalculateExpressionPayload, CalculationSuccessResponse, ErrorBody, ServerFailResponse,
} from "@calculator/common";
import {HttpRequestHandler} from "api/HttpRequestHandler";

export type QueryResult<T, E> =
    | { data: T, errors: undefined }
    | { data: undefined, errors: E }

export type CalculationApiResponse = QueryResult<CalculationSuccessResponse, ServerFailResponse>;

export type CalculationResult = string | null;
export type ExpressionCalculationResult = QueryResult<CalculationResult, ErrorBody>

export interface CalculatorApiService extends HttpRequestHandler {
    calculateExpression(params: CalculateExpressionPayload): Promise<ExpressionCalculationResult>;
};