import {
    CalculateExpressionPayload,
    CalculationResult,
} from "@calculator/common";
import {HttpRequestHandler} from "../../shared/api/HttpRequestHandler";

export interface CalculatorApiService extends HttpRequestHandler {
    calculateExpression(params: CalculateExpressionPayload): Promise<CalculationResult>;
};