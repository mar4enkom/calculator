import {CalculateExpressionPayload, ErrorBody} from "@calculator/common";
import {ExpressionCalculationResult, QueryResult} from "api/types";


export interface ExpressionCalculator {
    calculateExpression(params: CalculateExpressionPayload): Promise<ExpressionCalculationResult>;
}
