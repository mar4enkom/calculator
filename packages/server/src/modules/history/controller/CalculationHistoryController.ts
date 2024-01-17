import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {
    addHistoryItemPayloadValidator,
    AddHistoryRecordPayload,
    GetHistoryListPayload, getHistoryPayloadValidator, GetHistoryResponseBody, HistoryItem
} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {zParse} from "@/shared/utils/zParse";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {historyService} from "@/history/domain/HistoryService";


class CalculationHistoryController {
    async getLastRecords(
        req: RestRequestBody<GetHistoryListPayload>,
        res: RestResponse<GetHistoryResponseBody>,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload = zParse(getHistoryPayloadValidator, req);
            const historyRepository = repositoryStore.get().getHistoryRepository();
            const lastRecords = await historyRepository.find(payload);
            const recordsNumber = await historyRepository.countItems();
            sendSuccessResponse(res, {
                totalCount: recordsNumber,
                items: lastRecords,
            });
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
    async addRecord(
        req: RestRequestBody<AddHistoryRecordPayload>,
        res: RestResponse<HistoryItem>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const payload = zParse(addHistoryItemPayloadValidator, req);
            const newRecord = await historyService.addRecord(payload);

            sendSuccessResponse(res, newRecord);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const calculationHistoryController = new CalculationHistoryController();