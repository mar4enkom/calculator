import {CalculateExpressionPayload, CalculationResult} from "@calculator/common";

export interface Calculator {
    calculateExpression(payload: CalculateExpressionPayload): Promise<CalculationResult>;
}