import {RestRequestQuery, RestResponse} from "@/shared/types/express";
import {CalculationHistory, CalculationHistoryPayload} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import MockRepository from "@/history/dataAccess/MockRepository";
import {CalculationHistory as CalculationHistoryModel} from "@/history/domain/CalculationHistory";
import {historyPayloadValidator} from "@calculator/common/dist/modules/history/validations";
import {zParse} from "@/shared/utils/zParse";


class CalculationHistoryController {
    async getLastRecords(
        req: RestRequestQuery<CalculationHistoryPayload>,
        res: RestResponse<CalculationHistory>,
        next: NextFunction
    ) {
        try {
            const payload = zParse(historyPayloadValidator, req);
            const calculationHistory = new CalculationHistoryModel(MockRepository);
            const lastRecords = await calculationHistory.getLastRecords(payload);
            sendSuccessResponse(res, lastRecords);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export default (new CalculationHistoryController())