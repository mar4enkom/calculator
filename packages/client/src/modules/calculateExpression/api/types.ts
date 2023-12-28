import {
    CalculateExpressionPayload,
    CalculationResult,
    CalculationSuccessResponse,
} from "@calculator/common";
import {HttpRequestHandler} from "../../../shared/api/HttpRequestHandler";
import {QueryResult} from "../../../shared/api/types";

export type CalculationApiResponse = QueryResult<CalculationSuccessResponse>;

export type ExpressionCalculationResult = QueryResult<CalculationResult>

export interface CalculatorApiService extends HttpRequestHandler {
    calculateExpression(params: CalculateExpressionPayload): Promise<ExpressionCalculationResult>;
};