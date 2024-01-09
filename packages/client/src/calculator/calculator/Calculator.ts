import {CalculatorApiService} from "@/calculator/api/types";
import {CalculateExpressionPayload, CalculationHistoryItem} from "@calculator/common";
import {HistoryVariables} from "@/history/mvc/model/types";
import {Calculator as CalculatorInterface} from "@/calculator/calculator/types";

export class Calculator implements CalculatorInterface {
    constructor(
        private apiService: CalculatorApiService,
        private historyVariables: HistoryVariables,
    ) { }

    async calculateExpression(payload: CalculateExpressionPayload) {
        const persistedResult = this.persistCalculationFromHistory(payload.expression);
        if(persistedResult != null) {
            return persistedResult.expressionResult;
        }
        return await this.apiService.calculateExpression(payload);
    }

    private persistCalculationFromHistory(expression: string): CalculationHistoryItem | undefined {
        return this.historyVariables.value.getValue()
            ?.find(el => el.expression === expression);
    }
}