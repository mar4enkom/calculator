import {
    CalculateExpressionPayload, CalculationResponseBody,
} from "@calculator/common";
import {calculatorApiService} from "@/calculator/api/CalculatorApiService";
import {historyVariables} from "@/history/mvc/model/variables";

class Calculator {
    async calculateExpression(payload: CalculateExpressionPayload): Promise<CalculationResponseBody> {
        const lastHistoryElement = historyVariables.value.getValue()?.[0];
        if(lastHistoryElement != null && payload.expression === lastHistoryElement.expression) {
            return {
                calculationResult: lastHistoryElement.expressionResult,
                newRecord: undefined
            };
        }
        return await calculatorApiService.calculateExpression(payload);
    }
}

export const calculator = new Calculator();