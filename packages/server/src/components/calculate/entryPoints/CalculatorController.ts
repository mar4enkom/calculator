import {CalculateExpressionPayload, CalculationResult} from "@calculator/common";
import {RestRequestBody, RestResponse} from "../../../shared/types/express";
import {sendSuccessResponse} from "../../../shared/utils/sendResponse";
import {NextFunction} from "express";
import CalculatorService from "../domain/CalculatorService/CalculatorService/CalculatorService";
import {MultiError} from "../../../shared/errors/MultiError";
import {handleUnknownError} from "../../../shared/utils/handleUnknownError";

class CalculateController {
    calculateExpression(
        req: RestRequestBody<CalculateExpressionPayload>,
        res: RestResponse<CalculationResult>,
        next: NextFunction
    ): void {
        //throw new Error("unexpecred error")
        try {
            console.log({body: req.body.expression})
            const calculationResult = CalculatorService.calculate(req.body.expression);

            console.log({calculationResult})
            if("result" in calculationResult) {
                sendSuccessResponse(res, calculationResult.result);
            } else if("errors" in calculationResult) {
                next(new MultiError(calculationResult.errors));
            }
        } catch (error) {
            handleUnknownError(error);
        }
    }
}

export default new CalculateController();