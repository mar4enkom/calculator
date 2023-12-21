import {
    CalculateExpressionRequest as CommonCalculateExpressionRequest,
    CalculateExpressionResponse as CommonCalculateExpressionResponse,
    CalculateExpressionReturnType,
} from "@calculator/common";

export interface CalculateExpressionPayload extends CommonCalculateExpressionRequest {};
export type CalculateExpressionApiResponse = CommonCalculateExpressionResponse;

export interface CalculatorApiService {
    calculateExpression(params: CalculateExpressionPayload): Promise<CalculateExpressionReturnType>;
};