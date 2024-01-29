import {
    AddHistoryRecordPayload, Endpoints,
    GetHistoryListPayload, GetHistoryResponseBody, HistoryItem
} from "@calculator/common";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {
    createExpressAction,
} from "@/shared/utils/expressAction";
import {addHistory} from "@/history/controller/utils/utils";
import {ExpressController} from "@/shared/types/controller";

const historyRepository = repositoryStore.get().getHistoryRepository();

const historyController: ExpressController<Endpoints.HISTORY> = {
    get: createExpressAction<GetHistoryResponseBody, GetHistoryListPayload>(async (payload) => {
        const lastRecords = await historyRepository.findMany(payload);
        const recordsNumber = await historyRepository.count();
        return {
            totalCount: recordsNumber,
            items: lastRecords,
        };
    }),
    post: createExpressAction<HistoryItem, AddHistoryRecordPayload>(addHistory),
};

export default {
    [Endpoints.HISTORY]: historyController
};
