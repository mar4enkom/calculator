import {CalculateExpressionPayload} from "@calculator/common";
import {ExpressionCalculationResult} from "../shared/types/types";
export interface ExpressionCalculator {
    calculateExpression(params: CalculateExpressionPayload): Promise<ExpressionCalculationResult>;
}