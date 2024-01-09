import {HistoryEvents, HistoryVariables} from "../observer/types";
import {CalculationHistoryPayload} from "@calculator/common";
import {handleUnknownError} from "../../shared/utils/handleUnknownError";
import {HistoryApiService} from "../api/types";

export class HistoryController {
    private historyVariables: HistoryVariables;
    private historyEvents: HistoryEvents;
    private apiService: HistoryApiService;
    constructor(historyVariables: HistoryVariables, historyEvents: HistoryEvents, apiService: any) {
        this.historyVariables = historyVariables;
        this.historyEvents = historyEvents;
        this.apiService = apiService;
    }

    setupEventsSubscriptions(): void {
        this.historyEvents.onShowDialog.subscribe(this.onShowDialog.bind(this));
        this.historyEvents.onHideDialog.subscribe(this.onHideDialog.bind(this));
        this.historyEvents.onFetchLastHistoryRecords.subscribe(this.handleFetchLastHistoryRecords.bind(this));
    }

    private onShowDialog() {
        this.historyVariables.showDialog.setValue(true);
    }

    private onHideDialog() {
        this.historyVariables.showDialog.setValue(false);
    }

    private async handleFetchLastHistoryRecords(payload: CalculationHistoryPayload): Promise<void> {
        try {
            this.historyVariables.value.setValue(undefined);
            this.historyVariables.error.setValue(undefined);
            this.historyVariables.loading.setValue(true);

            const response = await this.apiService.fetchLastHistoryRecords(payload);
            this.historyVariables.value.setValue(response);
        } catch (e) {
            const error = handleUnknownError(e);
            this.historyVariables.error.setValue(error)
        } finally {
            this.historyVariables.loading.setValue(false);
        }
    }
}