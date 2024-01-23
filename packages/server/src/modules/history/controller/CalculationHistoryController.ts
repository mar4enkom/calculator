import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {
    addHistoryItemPayloadValidator,
    AddHistoryRecordPayload,
    GetHistoryListPayload, getHistoryPayloadValidator, GetHistoryResponseBody, HistoryItem
} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {RepositoryOrm} from "@/shared/controller/RepositoryOrm";
import {historyService} from "@/history/domain/HistoryService";


class CalculationHistoryController extends RepositoryOrm<HistoryItem, GetHistoryListPayload> {
    constructor() {
        const historyRepository = repositoryStore.get().getHistoryRepository();
        super(historyRepository);
    }
    async getHistory(
        req: RestRequestBody<GetHistoryListPayload>,
        res: RestResponse<GetHistoryResponseBody>,
        next: NextFunction
    ): Promise<void> {
        try {
            const lastRecords = await this.find(req.body, {
                zodValidation: getHistoryPayloadValidator
            });
            const recordsNumber = await this.countItems();

            sendSuccessResponse(res, {
                totalCount: recordsNumber,
                items: lastRecords,
            });
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
    async addHistory(
        req: RestRequestBody<AddHistoryRecordPayload>,
        res: RestResponse<HistoryItem>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const newRecord = {
                ...req.body,
                calculationDate: new Date(),
                id: (new Date()).toDateString()
            };

            const newRecordResult = await this.addItem(newRecord, {
                zodValidation: addHistoryItemPayloadValidator,
                before: historyService.validatePayload
            });

            sendSuccessResponse(res, newRecordResult);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const calculationHistoryController = new CalculationHistoryController();