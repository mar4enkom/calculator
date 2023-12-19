import {CalculateExpressionRequest, CalculateExpressionResponse} from "@calculator/common";
import {TRequestBody, TResponse} from "./types/types";
import {CalculatorService} from "calculatorService/CalculatorService/CalculatorService";

// TODO: make expression controller like model
// TODO: rearrange common types
// TODO: make auto aliases
export function calculateExpression(
    req: TRequestBody<CalculateExpressionRequest>,
    res: TResponse<CalculateExpressionResponse>
) {
    const expressionCalculator = new CalculatorService();
    const calculationResult = expressionCalculator.calculate(req.body.expression);

    res.json({
        result: calculationResult
    })
}