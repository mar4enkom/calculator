import {
    CalculateExpressionPayload, CalculationSuccessResponse, Maybe, ServerFailResponse,
} from "@calculator/common";
import {HttpRequestHandler} from "api/HttpRequestHandler";

export interface QueryResult<T, E> {
    data: Maybe<T>,
    errors: Maybe<E>
}

export type CalculationApiResponse = QueryResult<CalculationSuccessResponse, ServerFailResponse>;

export interface CalculatorApiService extends HttpRequestHandler {
    calculateExpression(params: CalculateExpressionPayload): Promise<CalculationApiResponse>;
};