import {
    AddHistoryRecordPayload,
    GetHistoryListPayload, GetHistoryResponseBody, HistoryItem
} from "@calculator/common";
import {historyService} from "@/history/domain/HistoryService";
import {createExpressCallback} from "@/shared/helpers/controller/BaseExpressController";
import {HistoryRepository} from "@/shared/helpers/repository/types";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";

class CalculationHistoryController {
    private repository: HistoryRepository = repositoryStore.get().getHistoryRepository();
    constructor() {
        this.getHistory = this.getHistory.bind(this);
        this.addHistory = this.addHistory.bind(this);
    }

    addHistory = createExpressCallback<HistoryItem, AddHistoryRecordPayload>(historyService.addHistory);
    getHistory = createExpressCallback<GetHistoryResponseBody, GetHistoryListPayload>(async (payload) => {
        const lastRecords = await this.repository.find(payload);
        const recordsNumber = await this.repository.countItems();
        return {
            totalCount: recordsNumber,
            items: lastRecords,
        };
    });
}

export const calculationHistoryController = new CalculationHistoryController();