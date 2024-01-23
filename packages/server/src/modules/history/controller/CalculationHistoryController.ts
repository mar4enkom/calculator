import {ExpressParams, RestRequestBody, RestResponse} from "@/shared/types/express";
import {
    addHistoryItemPayloadValidator,
    AddHistoryRecordPayload,
    GetHistoryListPayload, getHistoryPayloadValidator, GetHistoryResponseBody, GetUserListPayload, HistoryItem, User
} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {historyService} from "@/history/domain/HistoryService";
import {HistoryOrm, repositoryOrmFactory} from "@/shared/helpers/orm/RepositoryOrmFactory";
import {BaseOrmExpressController} from "@/shared/helpers/controller/BaseOrmExpressController";

class CalculationHistoryController extends BaseOrmExpressController<HistoryItem, GetHistoryListPayload> {
    constructor(orm: HistoryOrm) {
        super(orm);
    }

    async getHistory(...params: ExpressParams<GetHistoryListPayload, GetHistoryResponseBody>): Promise<void> {
        this.handleRequest(...params, async () => {
            const requestBody = params[0].body;
            const lastRecords = await this.orm.find(requestBody, {
                zodValidation: getHistoryPayloadValidator
            });
            const recordsNumber = await this.orm.countItems();
            return {
                totalCount: recordsNumber,
                items: lastRecords,
            };
        })
    }
    async addHistory(...params: ExpressParams<AddHistoryRecordPayload, HistoryItem>): Promise<void> {
        this.handleRequest(...params, async () => {
            const requestBody = params[0].body;
            const newRecord = {
                ...requestBody,
                calculationDate: new Date(),
                id: (new Date()).toDateString()
            };

            return await this.orm.addItem(newRecord, {
                zodValidation: addHistoryItemPayloadValidator,
                before: historyService.validatePayload
            });
        })
    }
}

export const calculationHistoryController
    = new CalculationHistoryController(repositoryOrmFactory.getHistoryOrm());