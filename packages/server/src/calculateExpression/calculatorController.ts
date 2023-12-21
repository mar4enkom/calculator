import {CalculateExpressionRequest, CalculateExpressionResponse} from "@calculator/common";
import {RestRequestBody, RestResponse} from "../shared/types/express";
import {CalculatorService} from "./CalculatorService/CalculatorService/CalculatorService";
import {sendErrorResponse, sendInternalServerErrorResponse, sendSuccessResponse} from "../shared/utils/sendResponse";

export function calculateExpression(
    req: RestRequestBody<CalculateExpressionRequest>,
    res: RestResponse<CalculateExpressionResponse>
) {
    try {
        const expressionCalculator = CalculatorService.getInstance();
        const calculationResult = expressionCalculator.calculate(req.body.expression);

        if("result" in calculationResult) {
            sendSuccessResponse(res, calculationResult.result);
        } else if("errors" in calculationResult) {
            sendErrorResponse(res, calculationResult.errors, 400)
        }
    } catch (e) {
        sendInternalServerErrorResponse(res);
    }
}