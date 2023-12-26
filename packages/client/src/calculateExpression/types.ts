import {CalculateExpressionPayload, ErrorBody} from "@calculator/common";
import {QueryResult} from "api/types";

export type ExpressionCalculationResult = QueryResult<CalculationResult, ErrorBody>
export type CalculationResult = string | null;

export interface ExpressionCalculator {
    calculateExpression(params: CalculateExpressionPayload): Promise<ExpressionCalculationResult>;
}
