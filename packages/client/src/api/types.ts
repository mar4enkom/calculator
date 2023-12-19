import {
    CalculateExpressionRequest as CommonCalculateExpressionRequest,
    CalculateExpressionResponse as CommonCalculateExpressionResponse,
    CalculateExpressionReturnType,
} from "@calculator/common";

export interface CalculateExpressionParams extends CommonCalculateExpressionRequest {};
export type CalculateExpressionApiResponse = CommonCalculateExpressionResponse;

export interface CalculatorApiService {
    calculateExpression(params: CalculateExpressionParams): Promise<CalculateExpressionReturnType>;
};