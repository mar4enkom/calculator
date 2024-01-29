import {
    AddHistoryRecordPayload, BasePaginationParams, Endpoints,
    GetHistoryListPayload, GetHistoryResponseBody, HistoryItem
} from "@calculator/common";
import {historyService} from "@/history/domain/HistoryService";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {createExpressAction} from "@/shared/helpers/controller/BaseExpressController";
import {BaseRepository} from "@/shared/helpers/repository/types";

const historyRepository = repositoryStore.get().getHistoryRepository();

class BaseRepositoryController<T, K extends BasePaginationParams> {
    public get: ReturnType<typeof createExpressAction<T[], K>>;
    public post: ReturnType<typeof createExpressAction<T, T>>;
    constructor(
        private repository: BaseRepository<T, K>
    ) {
        this.get = createExpressAction<T[], K>(this.repository.findMany);
        this.post = createExpressAction<T, T>(this.repository.create);
    }
}

class HistoryController extends BaseRepositoryController<HistoryItem, GetHistoryListPayload>{
    constructor() {
        super(repositoryStore.get().getHistoryRepository());
    }

    get = createExpressAction<HistoryItem, AddHistoryRecordPayload>(historyService.addHistory);
    post = createExpressAction<GetHistoryResponseBody, GetHistoryListPayload>(async (payload) => {
        const lastRecords = await historyRepository.findMany(payload);
        const recordsNumber = await historyRepository.count();
        return {
            totalCount: recordsNumber,
            items: lastRecords,
        };
    })
}

const historyController = {
    [Endpoints.HISTORY_ADD]: createExpressAction<HistoryItem, AddHistoryRecordPayload>(historyService.addHistory),
    [Endpoints.HISTORY_GET]: createExpressAction<GetHistoryResponseBody, GetHistoryListPayload>(async (payload) => {
        const lastRecords = await historyRepository.findMany(payload);
        const recordsNumber = await historyRepository.count();
        return {
            totalCount: recordsNumber,
            items: lastRecords,
        };
    })
};
export default historyController;
