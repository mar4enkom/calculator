import {CalculateExpressionReturnType} from "@calculator/common";
import {CalculateExpressionParams} from "api/types";

export interface ExpressionCalculator {
    calculateExpression(params: CalculateExpressionParams): Promise<CalculateExpressionReturnType>;
}