import {CalculateExpressionPayload, CalculationSuccessResponse} from "@calculator/common";
import {RestRequestBody, RestResponse} from "../../shared/types/express";
import {sendSuccessResponse} from "../../shared/utils/sendResponse";
import {NextFunction} from "express";
import CalculatorService from "./CalculatorService/CalculatorService/CalculatorService";

export function calculateExpression(
    req: RestRequestBody<CalculateExpressionPayload>,
    res: RestResponse<CalculationSuccessResponse>,
    next: NextFunction
) {
    try {
        const calculationResult = CalculatorService.calculate(req.body.expression);

        if("result" in calculationResult) {
            sendSuccessResponse(res, calculationResult.result);
        } else if("errors" in calculationResult) {
            next(calculationResult.errors);
        }
    } catch (error) {
        next(error);
    }
}