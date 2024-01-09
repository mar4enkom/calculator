import {RestRequestQuery, RestResponse} from "../../../shared/types/express";
import {CalculationHistory as CalculationHistoryType, CalculationHistoryPayload} from "@calculator/common";
import {handleUnknownError} from "../../../shared/utils/handleUnknownError";
import {CalculationHistory} from "../domain/CalculationHistory";
import MockRepository from "../dataAccess/MockRepository";
import {sendSuccessResponse} from "../../../shared/utils/sendResponse";
import {zParse} from "../../../shared/utils/zParse";
import {historyPayloadValidator} from "@calculator/common/dist/modules/history/validations";
import {NextFunction} from "express";

class CalculationHistoryController {
    async getLastRecords(
        req: RestRequestQuery<CalculationHistoryPayload>,
        res: RestResponse<CalculationHistoryType>,
        next: NextFunction
    ) {
        try {
            const payload = zParse(historyPayloadValidator, req);
            const calculationHistory = new CalculationHistory(MockRepository);
            const lastRecords = await calculationHistory.getLastRecords(payload);
            sendSuccessResponse(res, lastRecords);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export default (new CalculationHistoryController())