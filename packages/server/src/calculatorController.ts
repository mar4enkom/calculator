import {CalculateExpressionRequest, CalculateExpressionResponse, operationsConfig} from "@calculator/common";
import {ExpressionCalculator} from "calculatorService/ExpressionCalculator/ExpressionCalculator";
import {TRequestBody, TResponse} from "./types/types";

// TODO: make expression controller like model
// TODO: rearrange common types
// TODO: make auto aliases
export function calculateExpression(
    req: TRequestBody<CalculateExpressionRequest>,
    res: TResponse<CalculateExpressionResponse>
) {
    const expressionCalculator = new ExpressionCalculator(operationsConfig);
    const calculationResult = expressionCalculator.calculate(req.body.expression);

    res.json({
        result: calculationResult
    })
}