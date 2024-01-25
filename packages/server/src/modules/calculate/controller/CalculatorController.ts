import {ExpressParams} from "@/shared/types/express";
import {CalculateExpressionPayload, CalculationResponseBody} from "@calculator/common";
import {calculatorService} from "@/calculate/domain/CalculatorService/CalculatorService/CalculatorService";
import {historyService} from "@/history/domain/HistoryService";
import {handleExpressRequest} from "@/shared/helpers/controller/BaseExpressController";

class CalculateController {
    constructor() {
        this.calculateExpression = this.calculateExpression.bind(this);
    }
    async calculateExpression(...params: ExpressParams<CalculateExpressionPayload, CalculationResponseBody>): Promise<void> {
        handleExpressRequest<CalculationResponseBody, CalculateExpressionPayload>(...params, async (payload) => {
            const calculationResult = calculatorService.calculate(payload.expression);
            let newRecord: CalculationResponseBody["newRecord"];

            if(calculationResult != null) {
                newRecord = await historyService.addHistory({
                    expression: payload.expression,
                    expressionResult: calculationResult,
                });
            }
            return { calculationResult, newRecord };
        })
    }
}

export const calculatorController = new CalculateController();