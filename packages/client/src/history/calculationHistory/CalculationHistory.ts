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

    async getRecentRecords(payload: GetHistoryActionPayload): Promise<CalculationHistoryType> {
        if(!this.historyVariables.isFetched.getValue()) {
            this.historyVariables.isFetched.setValue(true);
            return await this.historyApiService.getRecentRecords(payload);
        }
        if(this.historyVariables.value.getValue() == null) {
            return [];
        }
        return this.historyVariables.value.getValue()!;
    }

    addRecord(payload: CalculationHistoryItem): CalculationHistoryType {
        const currentHistory = this.historyVariables.value.getValue();

        if(currentHistory == null) return [payload];

        const expressionInHistory = currentHistory
            .find(e => e.expression === payload.expression);

        let newHistory;
        if(expressionInHistory != null) {
            const historyWithoutPayloadExpression = currentHistory
                .filter(e => e.expression !== expressionInHistory.expression);

            newHistory = [
                expressionInHistory,
                ...historyWithoutPayloadExpression
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