import {AddHistoryRecordPayload, GetHistoryListPayload, HistoryItem} from "@calculator/common";
import {ServerError} from "@/shared/errors/ServerError";
import {HttpStatusCodes} from "@/shared/constants/httpStatusCodes";
import {ServerErrorCodes} from "@/shared/constants/serverErrors";
import {BaseController} from "@/shared/controller/BaseController";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";

class HistoryService extends BaseController<HistoryItem, GetHistoryListPayload> {
    constructor() {
        const historyRepository = repositoryStore.get().getHistoryRepository();
        super(historyRepository);
    }

    async validatePayload(payload: AddHistoryRecordPayload) {
        const lastHistoryElement = (await this.find({
            pageNumber: 0,
            limit: 1,
        }))?.[0];

        if(lastHistoryElement != null && lastHistoryElement?.expression === payload.expression) {
            throw new ServerError(
                HttpStatusCodes.BAD_REQUEST,
                ServerErrorCodes.VALIDATION_ERROR,
                "This expression is already the last record"
            );
        }
    }
}

export const historyService = new HistoryService();