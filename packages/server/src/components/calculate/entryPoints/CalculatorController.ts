import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {CalculateExpressionPayload, CalculationResult} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {MultiError} from "@/shared/errors/MultiError";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {calculatorService} from "@/calculate/domain/CalculatorService/CalculatorService/CalculatorService";

class CalculateController {
    calculateExpression(
        req: RestRequestBody<CalculateExpressionPayload>,
        res: RestResponse<CalculationResult>,
        next: NextFunction
    ): void {
        try {
            const calculationResult = calculatorService.calculate(req.body.expression);

            if("result" in calculationResult) {
                sendSuccessResponse(res, calculationResult.result);
            } else if("errors" in calculationResult) {
                next(new MultiError(calculationResult.errors));
            }
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const calculatorController = new CalculateController();