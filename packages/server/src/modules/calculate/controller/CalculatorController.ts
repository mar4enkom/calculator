import {CalculateExpressionPayload, CalculationResponseBody} from "@calculator/common";
import {calculatorService} from "@/calculate/domain/CalculatorService/CalculatorService/CalculatorService";
import {historyService} from "@/history/domain/HistoryService";
import {createExpressCallback} from "@/shared/helpers/controller/BaseExpressController";

export const calculatorController = {
    calculateExpression: createExpressCallback<CalculationResponseBody, CalculateExpressionPayload>(async (payload) => {
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
