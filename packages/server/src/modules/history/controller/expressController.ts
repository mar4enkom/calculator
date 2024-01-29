import {
    AddHistoryRecordPayload, Endpoints,
    GetHistoryListPayload, GetHistoryResponseBody, HistoryItem
} from "@calculator/common";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {
    createExpressAction,
} from "@/shared/helpers/controller/BaseExpressController";
import {createHistory} from "@/history/controller/utils/utils";
import {BaseExpressController} from "@/shared/types/controller";

const historyRepository = repositoryStore.get().getHistoryRepository();

type HistoryController = BaseExpressController<
    HistoryItem,
    GetHistoryListPayload,
    GetHistoryResponseBody,
    AddHistoryRecordPayload
>;

const historyController: HistoryController = {
    get: createExpressAction(async (payload) => {
        const lastRecords = await historyRepository.findMany(payload);
        const recordsNumber = await historyRepository.count();
        return {
            totalCount: recordsNumber,
            items: lastRecords,
        };
    }),
    post: createExpressAction(createHistory),
    put: createExpressAction(historyRepository.update)
};

export default {
    [Endpoints.HISTORY]: historyController
};
