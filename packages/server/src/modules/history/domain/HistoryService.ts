import {
    addHistoryItemPayloadValidator,
    AddHistoryRecordPayload,
    HistoryItem
} from "@calculator/common";
import {ServerError} from "@/shared/errors/ServerError";
import {HttpStatusCodes} from "@/shared/constants/httpStatusCodes";
import {ServerErrorCodes} from "@/shared/constants/serverErrors";
import {HistoryRepository} from "@/shared/helpers/repository/types";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {handleRequest} from "@/shared/helpers/controller/BaseExpressController";

class HistoryService {
    private repository: HistoryRepository = repositoryStore.get().getHistoryRepository();

    constructor() {
        this.addHistory = this.addHistory.bind(this);
    }

    async addHistory(payload: AddHistoryRecordPayload): Promise<HistoryItem> {
        const newRecord: HistoryItem = {
            ...payload,
            calculationDate: new Date(),
            id: (new Date()).toDateString()
        };

        return await handleRequest<HistoryItem, HistoryItem>(this.repository.addItem, newRecord, {
            zodValidation: addHistoryItemPayloadValidator,
            before: historyService.validatePayload.bind(this)
        })
    }

    private async validatePayload(payload: AddHistoryRecordPayload) {
        const lastHistoryElement = (await this.repository.find({
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