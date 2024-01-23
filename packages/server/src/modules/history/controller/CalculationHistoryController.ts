import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {
    addHistoryItemPayloadValidator,
    AddHistoryRecordPayload,
    GetHistoryListPayload, getHistoryPayloadValidator, GetHistoryResponseBody, GetUserListPayload, HistoryItem, User
} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {historyService} from "@/history/domain/HistoryService";
import {HistoryOrm, repositoryOrmFactory} from "@/shared/orm/RepositoryOrmFactory";


class CalculationHistoryController {
    constructor(
        private orm: HistoryOrm = orm
    ) { }

    async getHistory(
        req: RestRequestBody<GetHistoryListPayload>,
        res: RestResponse<GetHistoryResponseBody>,
        next: NextFunction
    ): Promise<void> {
        try {
            const lastRecords = await this.orm.find(req.body, {
                zodValidation: getHistoryPayloadValidator
            });
            const recordsNumber = await this.orm.countItems();

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

            const newRecordResult = await this.orm.addItem(newRecord, {
                zodValidation: addHistoryItemPayloadValidator,
                before: historyService.validatePayload
            });

            sendSuccessResponse(res, newRecordResult);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const calculationHistoryController
    = new CalculationHistoryController(repositoryOrmFactory.getHistoryOrm());