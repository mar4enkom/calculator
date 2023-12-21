import {
    CalculateExpressionRequest as CommonCalculateExpressionRequest,
    CalculateExpressionResponse as CommonCalculateExpressionResponse,
    CalculateExpressionReturnType,
} from "@calculator/common";
import {HttpRequestHandler} from "api/HttpRequestHandler";

export interface CalculateExpressionPayload extends CommonCalculateExpressionRequest {};
export type CalculateExpressionApiResponse = CommonCalculateExpressionResponse;

export interface CalculatorApiService extends HttpRequestHandler {
    calculateExpression(params: CalculateExpressionPayload): Promise<CalculateExpressionReturnType>;
};