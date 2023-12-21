import {CalculateExpressionReturnType} from "@calculator/common";
import {CalculateExpressionPayload} from "api/types";

export interface ExpressionCalculator {
    calculateExpression(params: CalculateExpressionPayload): Promise<CalculateExpressionReturnType>;
}