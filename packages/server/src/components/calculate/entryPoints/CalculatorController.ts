import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {CalculateExpressionPayload, CalculationResult} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
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
            sendSuccessResponse(res, calculationResult);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const calculatorController = new CalculateController();