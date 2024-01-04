import {CalculateExpressionPayload, CalculationResult} from "@calculator/common";

export interface ExpressionCalculator {
    calculateExpression(params: CalculateExpressionPayload): Promise<CalculationResult>;
}
