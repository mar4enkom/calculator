import {CalculateExpressionRequest, CalculateExpressionResponse} from "@calculator/common";
import {TRequestQuery, TResponse} from "../shared/types/express";
import {CalculatorService} from "./CalculatorService/CalculatorService/CalculatorService";

export function calculateExpression(
    req: TRequestQuery<CalculateExpressionRequest>,
    res: TResponse<CalculateExpressionResponse>
) {
    const expressionCalculator = new CalculatorService();
    const calculationResult = expressionCalculator.calculate(req.query.expression);

    res.json({
        result: calculationResult
    })
}