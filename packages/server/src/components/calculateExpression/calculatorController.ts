import {CalculateExpressionPayload, CalculationSuccessResponse} from "@calculator/common";
import {RestRequestBody, RestResponse} from "../../shared/types/express";
import {sendSuccessResponse} from "../../shared/utils/sendResponse";
import {NextFunction} from "express";
import CalculatorService from "./CalculatorService/CalculatorService/CalculatorService";
import {MultiError} from "../../shared/errors/MultiError";
import {handleError} from "../../shared/utils/handleError";

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
            throw new MultiError(calculationResult.errors);
        }
    } catch (error) {
        handleError(error);
    }
}