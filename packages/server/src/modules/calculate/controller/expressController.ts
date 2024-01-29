import {CalculateExpressionPayload, CalculationResponseBody, Endpoints} from "@calculator/common";
import {calculatorService} from "@/calculate/domain/CalculatorService/CalculatorService/CalculatorService";
import {historyService} from "@/history/domain/HistoryService";
import {createExpressAction} from "@/shared/helpers/controller/BaseExpressController";

const expressController = {
    [Endpoints.CALCULATE]: createExpressAction<CalculationResponseBody, CalculateExpressionPayload>(async (payload) => {
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

export default expressController;
