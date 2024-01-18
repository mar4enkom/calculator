import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {CalculateExpressionPayload, CalculationResponseBody} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {calculatorService} from "@/calculate/domain/CalculatorService/CalculatorService/CalculatorService";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {historyService} from "@/history/domain/HistoryService";

class CalculateController {
    async calculateExpression(
        req: RestRequestBody<CalculateExpressionPayload>,
        res: RestResponse<CalculationResponseBody>,
        next: NextFunction
    ): Promise<void> {
        try {
            const calculationResult = calculatorService.calculate(req.body.expression);
            let newRecord: CalculationResponseBody["newRecord"];

            if(calculationResult != null) {
                newRecord = await historyService.addRecord({
                    expression: req.body.expression,
                    expressionResult: calculationResult,
                });
            }

            sendSuccessResponse(res, { calculationResult, newRecord });
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const calculatorController = new CalculateController();