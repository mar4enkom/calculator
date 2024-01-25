import {
    AddHistoryRecordPayload, Endpoints,
    GetHistoryListPayload, GetHistoryResponseBody, HistoryItem
} from "@calculator/common";
import {historyService} from "@/history/domain/HistoryService";
import {createExpressCallback} from "@/shared/helpers/controller/BaseExpressController";
import {HistoryRepository} from "@/shared/helpers/repository/types";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";

class CalculationHistoryController {
    private repository: HistoryRepository = repositoryStore.get().getHistoryRepository();
    constructor() {
        this[Endpoints.HISTORY_GET] = this[Endpoints.HISTORY_GET].bind(this);
        this[Endpoints.HISTORY_ADD] = this[Endpoints.HISTORY_ADD].bind(this);
    }

    [Endpoints.HISTORY_GET] = createExpressCallback<HistoryItem, AddHistoryRecordPayload>(historyService.addHistory);
    [Endpoints.HISTORY_ADD] = createExpressCallback<GetHistoryResponseBody, GetHistoryListPayload>(async (payload) => {
        const lastRecords = await this.repository.find(payload);
        const recordsNumber = await this.repository.countItems();
        return {
            totalCount: recordsNumber,
            items: lastRecords,
        };
    });
}

export default new CalculationHistoryController();
