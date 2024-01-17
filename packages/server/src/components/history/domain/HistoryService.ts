import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {AddHistoryRecordPayload} from "@calculator/common";
import {ServerError} from "@/shared/errors/ServerError";
import {HttpStatusCodes} from "@/shared/constants/httpStatusCodes";
import {ServerErrorCodes} from "@/shared/constants/serverErrors";

class HistoryService {
    async addRecord(payload: AddHistoryRecordPayload) {
        const historyRepository = repositoryStore.get().getHistoryRepository();

        const lastHistoryElement = (await historyRepository.find({pageNumber: 0, limit: 1}))?.[0];

        if (lastHistoryElement == null || lastHistoryElement.expression !== payload.expression) {
            return await historyRepository.addItem(payload);
        }
        throw new ServerError(
            HttpStatusCodes.BAD_REQUEST,
            ServerErrorCodes.VALIDATION_ERROR,
            "This expression is already last record"
        )
    }
}

export const historyService = new HistoryService();