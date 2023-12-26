import {
    CalculateExpressionPayload, CalculationSuccessResponse, ServerFailResponse,
} from "@calculator/common";
import {HttpRequestHandler} from "api/HttpRequestHandler";

export type QueryResult<T, E> =
    | { data: T, errors: undefined }
    | { data: undefined, errors: E }

export type CalculationApiResponse = QueryResult<CalculationSuccessResponse, ServerFailResponse>;

export interface CalculatorApiService extends HttpRequestHandler {
    calculateExpression(params: CalculateExpressionPayload): Promise<CalculationApiResponse>;
};