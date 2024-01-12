import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {CalculationHistory, GetHistoryListPayload} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {historyPayloadValidator} from "@calculator/common/dist/modules/history/validations";
import {zParse} from "@/shared/utils/zParse";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";


class CalculationHistoryController {
    async getLastRecords(
        req: RestRequestBody<GetHistoryListPayload>,
        res: RestResponse<CalculationHistory>,
        next: NextFunction
    ) {
        try {
            const payload = zParse(historyPayloadValidator, req);
            const historyRepository = repositoryStore.get().createHistoryRepository();
            const lastRecords = await historyRepository.find(payload);
            sendSuccessResponse(res, lastRecords);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const calculationHistoryController = new CalculationHistoryController();