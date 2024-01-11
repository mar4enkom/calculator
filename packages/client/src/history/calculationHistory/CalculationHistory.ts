import {HistoryVariables} from "@/history/mvc/model/types";
import {HistoryApiService} from "@/history/api/types";
import {CalculationHistory as CalculationHistoryInterface} from "./types";
import {
    CalculationHistory as CalculationHistoryType,
    GetHistoryActionPayload,
    CalculationHistoryItem
} from "@calculator/common";

export class CalculationHistory implements CalculationHistoryInterface {
    constructor(
        private historyVariables: HistoryVariables,
        private historyApiService: HistoryApiService
    ) { }

    async getHistory(payload: GetHistoryActionPayload): Promise<CalculationHistoryType> {
        if(!this.historyVariables.isFetched.getValue()) {
            this.historyVariables.isFetched.setValue(true);
            return await this.historyApiService.fetchLastHistoryRecords(payload);
        }
        if(this.historyVariables.value.getValue() == null) {
            return [];
        }
        return this.historyVariables.value.getValue()!;
    }

    addHistoryRecord(payload: CalculationHistoryItem): CalculationHistoryType {
        const currentHistory = this.historyVariables.value.getValue();

        if(currentHistory == null) return [payload];

        const expressionInHistory = currentHistory
            .find(e => e.expression === payload.expression);

        let newHistory;
        if(expressionInHistory != null) {
            newHistory = [
                expressionInHistory,
                ...currentHistory
                    .filter(e => e.expression !== expressionInHistory.expression)
            ];
        } else {
            newHistory = [
                payload,
                ...currentHistory.slice(0, -1),
            ];
        }
        return newHistory;
    }
}