import {CalculateExpressionRequest, CalculateExpressionResponse} from "@calculator/common";
import {TRequestQuery, TResponse} from "./types/types";
import {CalculatorService} from "calculatorService/CalculatorService/CalculatorService";

// TODO: make expression controller like model
// TODO: rearrange common types
// TODO: make auto aliases
export function calculateExpression(
    req: TRequestQuery<CalculateExpressionRequest>,
    res: TResponse<CalculateExpressionResponse>
) {
    const expressionCalculator = new CalculatorService();
    console.log(expressionCalculator);
    const calculationResult = expressionCalculator.calculate(req.query.expression);

    res.json({
        result: calculationResult
    })
}