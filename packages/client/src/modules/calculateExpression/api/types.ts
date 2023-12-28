import {
    CalculateExpressionPayload,
    CalculationSuccessResponse,
    ErrorBody,
    ServerFailResponse,
} from "@calculator/common";
import {HttpRequestHandler} from "../../../shared/api/HttpRequestHandler";
import {QueryResult} from "../../../shared/api/types";

export type CalculationApiResponse = QueryResult<CalculationSuccessResponse, ServerFailResponse>;

export type CalculationResult = string | null;
export type ExpressionCalculationResult = QueryResult<CalculationResult, ErrorBody>

export interface CalculatorApiService extends HttpRequestHandler {
    calculateExpression(params: CalculateExpressionPayload): Promise<ExpressionCalculationResult>;
};