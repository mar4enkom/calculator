import {CalculatorApiService} from "@/calculator/api/types";
import {
    CalculateExpressionPayload,
} from "@calculator/common";
import {Calculator as CalculatorInterface} from "@/calculator/calculator/types";
import {HistoryEvents} from "@/history/mvc/model/types";

export class Calculator implements CalculatorInterface {
    constructor(
        private calculatorApiService: CalculatorApiService,
        private historyEvents: HistoryEvents,
    ) { }

    async calculateExpression(payload: CalculateExpressionPayload) {
        const result = await this.calculatorApiService.calculateExpression(payload);

        if(result != null) {
            this.historyEvents.onAddHistoryRecord.dispatch({
                expression: payload.expression,
                calculationDate: new Date(),
                expressionResult: result,
                id: (new Date()).toDateString()
            });
        }

        return result;
    }
}