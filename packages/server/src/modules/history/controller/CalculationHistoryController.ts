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
import {BaseController} from "@/shared/controller/BaseController";
import {ServerErrorCodes} from "@/shared/constants/serverErrors";
import {ServerError} from "@/shared/errors/ServerError";
import {HttpStatusCodes} from "@/shared/constants/httpStatusCodes";


class CalculationHistoryController extends BaseController<HistoryItem, GetHistoryListPayload> {
    constructor() {
        const historyRepository = repositoryStore.get().getHistoryRepository();
        super(historyRepository);
    }
    async getHistory(
        req: RestRequestBody<GetHistoryListPayload>,
        res: RestResponse<GetHistoryResponseBody>,
        next: NextFunction
    ): Promise<void> {
        try {
            const lastRecords = await this.find(req.body, {
                before(p) {
                    zParse(getHistoryPayloadValidator, p);
                }
            });
            const recordsNumber = await this.countItems();

            sendSuccessResponse(res, {
                totalCount: recordsNumber,
                items: lastRecords,
            });
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
    async addHistory(
        req: RestRequestBody<AddHistoryRecordPayload>,
        res: RestResponse<HistoryItem>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const newRecord = {
                ...req.body,
                calculationDate: new Date(),
                id: (new Date()).toDateString()
            };

            // 2. Бифор должен возвращать новый результат
            const newRecordResult = await this.addItem(newRecord, {
                before: async (p: HistoryItem) => {
                    zParse(addHistoryItemPayloadValidator, req.body);

                    const lastHistoryElement = (await this.find({
                        pageNumber: 0,
                        limit: 1,
                    }))?.[0];

                    if(lastHistoryElement?.expression === p.expression && lastHistoryElement != null) {
                        throw new ServerError(
                            HttpStatusCodes.BAD_REQUEST,
                            ServerErrorCodes.VALIDATION_ERROR,
                            "This expression is already the last record"
                        );
                    }
                }
            });

            sendSuccessResponse(res, newRecordResult);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const calculationHistoryController = new CalculationHistoryController();