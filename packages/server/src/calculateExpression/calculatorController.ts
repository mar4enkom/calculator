import {CalculateExpressionRequest, CalculateExpressionResponse} from "@calculator/common";
import {RequestBody, RequestQuery, Response} from "../shared/types/express";
import {CalculatorService} from "./CalculatorService/CalculatorService/CalculatorService";

export function calculateExpression(
    req: RequestBody<CalculateExpressionRequest>,
    res: Response<CalculateExpressionResponse>
) {
    const expressionCalculator = CalculatorService.getInstance();
    const calculationResult = expressionCalculator.calculate(req.body.expression);

    res.json({
        result: calculationResult
    })
}