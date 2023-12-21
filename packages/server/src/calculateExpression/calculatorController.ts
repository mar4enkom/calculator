import {CalculateExpressionRequest, CalculateExpressionResponse} from "@calculator/common";
import {RequestQuery, Response} from "../shared/types/express";
import {CalculatorService} from "./CalculatorService/CalculatorService/CalculatorService";

export function calculateExpression(
    req: RequestQuery<CalculateExpressionRequest>,
    res: Response<CalculateExpressionResponse>
) {
    const expressionCalculator = CalculatorService.getInstance();
    const calculationResult = expressionCalculator.calculate(req.query.expression);

    res.json({
        result: calculationResult
    })
}