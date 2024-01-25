import {ExpressParams} from "@/shared/types/express";
import {
    AddHistoryRecordPayload,
    GetHistoryListPayload, GetHistoryResponseBody, HistoryItem
} from "@calculator/common";
import {historyService} from "@/history/domain/HistoryService";
import {handleExpressRequest} from "@/shared/helpers/controller/BaseExpressController";
import {HistoryRepository} from "@/shared/helpers/repository/types";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";

class CalculationHistoryController {
    private repository: HistoryRepository = repositoryStore.get().getHistoryRepository();
    constructor() {
        this.getHistory = this.getHistory.bind(this);
        this.addHistory = this.addHistory.bind(this);
    }

    async getHistory(...params: ExpressParams<GetHistoryListPayload, GetHistoryResponseBody>): Promise<void> {
        handleExpressRequest<GetHistoryResponseBody, GetHistoryListPayload>(...params, async (payload) => {
            const lastRecords = await this.repository.find(payload);
            const recordsNumber = await this.repository.countItems();
            return {
                totalCount: recordsNumber,
                items: lastRecords,
            };
        });
    }
    async addHistory(...params: ExpressParams<AddHistoryRecordPayload, HistoryItem>): Promise<void> {
        handleExpressRequest<HistoryItem, AddHistoryRecordPayload>(...params, historyService.addHistory);
    }
}

export const calculationHistoryController = new CalculationHistoryController();