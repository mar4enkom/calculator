import {CalculateExpressionPayload} from "@calculator/common";
import {ExpressionCalculatorReturn} from "../shared/types/types";
export interface ExpressionCalculator {
    calculateExpression(params: CalculateExpressionPayload): Promise<ExpressionCalculatorReturn>;
}