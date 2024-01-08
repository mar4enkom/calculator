import {RestRequestQuery, RestResponse} from "../../../shared/types/express";
import {CalculationHistory as CalculationHistoryType, CalculationHistoryPayload} from "@calculator/common";
import {handleUnknownError} from "../../../shared/utils/handleUnknownError";
import {CalculationHistory} from "../domain/CalculationHistory";
import MockRepository from "../dataAccess/MockRepository";
import {sendSuccessResponse} from "../../../shared/utils/sendResponse";

class CalculationHistoryController {
    async getLastRecords(
        _req: RestRequestQuery<CalculationHistoryPayload>,
        res: RestResponse<CalculationHistoryType>,
    ) {
        try {
            const calculationHistory = new CalculationHistory(MockRepository);
            const lastRecords = await calculationHistory.getLastRecords();
            sendSuccessResponse(res, lastRecords);
        } catch (error) {
            handleUnknownError(error);
        }
    }
}

export default (new CalculationHistoryController())