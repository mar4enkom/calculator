import {CalculateExpressionRequest, CalculateExpressionResponse, operationsConfig} from "@calculator/common";
import {ExpressionCalculator} from "calculatorService/ExpressionCalculator/ExpressionCalculator";
import {TRequestQuery, TResponse} from "./types/types";

// TODO: make expression controller like model
// TODO: rearrange common types
// TODO: make auto aliases
export function calculateExpression(
    req: TRequestQuery<CalculateExpressionRequest>,
    res: TResponse<CalculateExpressionResponse>
) {
    console.log(req.query.expression);
    const expressionCalculator = new ExpressionCalculator(operationsConfig);
    const calculationResult = expressionCalculator.calculate(req.query.expression);

    res.json({
        result: calculationResult
    })
}