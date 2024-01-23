import {ExpressParams} from "@/shared/types/express";
import {CalculateExpressionPayload, CalculationResponseBody} from "@calculator/common";
import {calculatorService} from "@/calculate/domain/CalculatorService/CalculatorService/CalculatorService";
import {BaseExpressController} from "@/shared/helpers/controller/BaseExpressController";
import {historyService} from "@/history/domain/HistoryService";

class CalculateController extends BaseExpressController {
    constructor() {
        super();
    }
    async calculateExpression(...params: ExpressParams<CalculateExpressionPayload, CalculationResponseBody>): Promise<void> {
        this.handleRequest(...params, async (payload) => {
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