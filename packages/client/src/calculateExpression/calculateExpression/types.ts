import {CalculateExpressionPayload} from "@calculator/common";
import {ExpressionCalculationResult} from "../api/types";


export interface ExpressionCalculator {
    calculateExpression(params: CalculateExpressionPayload): Promise<ExpressionCalculationResult>;
}
