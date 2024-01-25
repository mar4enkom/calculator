import {
    AddHistoryRecordPayload, Endpoints,
    GetHistoryListPayload, GetHistoryResponseBody, HistoryItem
} from "@calculator/common";
import {historyService} from "@/history/domain/HistoryService";
import {createExpressCallback} from "@/shared/helpers/controller/BaseExpressController";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";

const historyRepository = repositoryStore.get().getHistoryRepository();

const historyController = {
    [Endpoints.HISTORY_ADD]: createExpressCallback<HistoryItem, AddHistoryRecordPayload>(historyService.addHistory),
    [Endpoints.HISTORY_GET]: createExpressCallback<GetHistoryResponseBody, GetHistoryListPayload>(async (payload) => {
        const lastRecords = await historyRepository.find(payload);
        const recordsNumber = await historyRepository.countItems();
        return {
            totalCount: recordsNumber,
            items: lastRecords,
        };
    })
};
export default historyController;
