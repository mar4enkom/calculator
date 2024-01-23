import {ExpressParams} from "@/shared/types/express";
import {
    AddHistoryRecordPayload,
    GetHistoryListPayload, getHistoryPayloadValidator, GetHistoryResponseBody, HistoryItem
} from "@calculator/common";
import {historyService} from "@/history/domain/HistoryService";
import {HistoryOrm, repositoryOrmFactory} from "@/shared/helpers/orm/RepositoryOrmFactory";
import {BaseOrmExpressController} from "@/shared/helpers/controller/BaseOrmExpressController";

class CalculationHistoryController extends BaseOrmExpressController<HistoryItem, GetHistoryListPayload> {
    constructor(orm: HistoryOrm) {
        super(orm);

        this.getHistory = this.getHistory.bind(this);
        this.addHistory = this.addHistory.bind(this);
    }

    async getHistory(...params: ExpressParams<GetHistoryListPayload, GetHistoryResponseBody>): Promise<void> {
        this.handleRequest(...params, async (payload) => {
            const lastRecords = await this.orm.find(payload, {
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
        this.handleRequest(...params, historyService.addHistory);
    }
}

export const calculationHistoryController
    = new CalculationHistoryController(repositoryOrmFactory.getHistoryOrm());