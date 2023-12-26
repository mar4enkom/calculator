import {CalculateExpressionPayload, CalculationResult} from "@calculator/common";
import {RestRequestBody, RestResponse} from "../../shared/types/express";
import {sendSuccessResponse} from "../../shared/utils/sendResponse";
import {NextFunction} from "express";
import CalculatorService from "./CalculatorService/CalculatorService/CalculatorService";
import {MultiError} from "../../shared/errors/MultiError";
import {handleUnknownError} from "../../shared/utils/handleUnknownError";

class CalculatorController {
    calculateExpression(
        req: RestRequestBody<CalculateExpressionPayload>,
        res: RestResponse<CalculationResult>,
        next: NextFunction
    ): void {
        //throw new Error("unexpecred error")
        try {
            const calculationResult = CalculatorService.calculate(req.body.expression);

            if("result" in calculationResult) {
                sendSuccessResponse<CalculationResult>(res, calculationResult.result);
            } else if("errors" in calculationResult) {
                next(new MultiError(calculationResult.errors));
            }
        } catch (error) {
            handleUnknownError(error);
        }
    }
}

export default new CalculatorController();