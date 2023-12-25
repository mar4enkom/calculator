import {
    CalculateExpressionPayload,
} from "@calculator/common";
import {HttpRequestHandler} from "api/HttpRequestHandler";
import {CalculationResult} from "../shared/types/types";

export interface CalculatorApiService extends HttpRequestHandler {
    calculateExpression(params: CalculateExpressionPayload): Promise<CalculationResult>;
};