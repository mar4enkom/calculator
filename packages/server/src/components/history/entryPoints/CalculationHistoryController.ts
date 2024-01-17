import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {
    addHistoryItemPayloadValidator,
    AddHistoryRecordPayload,
    CalculationHistory,
    GetHistoryListPayload, getHistoryPayloadValidator, HistoryItem
} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {zParse} from "@/shared/utils/zParse";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";


class CalculationHistoryController {
    async getLastRecords(
        req: RestRequestBody<GetHistoryListPayload>,
        res: RestResponse<CalculationHistory>,
        next: NextFunction
    ) {
        try {
            const payload = zParse(getHistoryPayloadValidator, req);
            const historyRepository = repositoryStore.get().getHistoryRepository();
            const lastRecords = await historyRepository.find(payload);
            sendSuccessResponse(res, lastRecords);
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
            const historyRepository = repositoryStore.get().getHistoryRepository();
            const response = await historyRepository.addItem(payload);
            sendSuccessResponse(res, response)
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const calculationHistoryController = new CalculationHistoryController();