import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {CalculationHistory, CalculationHistoryPayload} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {historyPayloadValidator} from "../../../../../calculator-common/src/modules/history/validations/validations";
import {zParse} from "@/shared/utils/zParse";
import {repositoryFactory} from "@/shared/repository/RepositoryAbstractFactory";


class CalculationHistoryController {
    async getLastRecords(
        req: RestRequestBody<CalculationHistoryPayload>,
        res: RestResponse<CalculationHistory>,
        next: NextFunction
    ) {
        try {
            const payload = zParse(historyPayloadValidator, req);
            const historyRepository = repositoryFactory.createHistoryRepository();
            const lastRecords = await historyRepository.find(payload);
            sendSuccessResponse(res, lastRecords);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export default (new CalculationHistoryController())