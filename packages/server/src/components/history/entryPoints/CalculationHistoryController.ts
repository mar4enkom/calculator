import {RestRequestQuery, RestResponse} from "@/shared/types/express";
import {CalculationHistory, CalculationHistoryItem, CalculationHistoryPayload} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {historyPayloadValidator} from "../../../../../calculator-common/src/modules/history/validations/validations";
import {zParse} from "@/shared/utils/zParse";
import {repositoryFactory} from "@/shared/repository/RepositoryAbstractFactory";
import {PaginationParams} from "@/shared/repository/types";


class CalculationHistoryController {
    async getLastRecords(
        req: RestRequestQuery<CalculationHistoryPayload>,
        res: RestResponse<CalculationHistory>,
        next: NextFunction
    ) {
        function transformPayload(payload: CalculationHistoryPayload): PaginationParams<CalculationHistoryItem> {
            // param "a" is always can be parsable to int because we have checked it via zod validation
            const parseIntIfParamDefined = (a: string | undefined): number | undefined =>
                a == null ? undefined : +a;

            return {
                ...payload,
                pageNumber: parseIntIfParamDefined(payload.pageNumber),
                limit: parseIntIfParamDefined(payload.limit),
            }
        }
        try {
            const payload = zParse(historyPayloadValidator, req);
            const transformedPayload = transformPayload(payload);
            const historyRepository = repositoryFactory.createHistoryRepository();
            const lastRecords = await historyRepository.find(transformedPayload);
            sendSuccessResponse(res, lastRecords);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export default (new CalculationHistoryController())