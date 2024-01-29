import {addHistoryItemPayloadValidator, AddHistoryRecordPayload, HistoryItem} from "@calculator/common";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {ServerError} from "@/shared/errors/ServerError";
import {HttpStatusCodes} from "@/shared/constants/httpStatusCodes";
import {ServerErrorCodes} from "@/shared/constants/serverErrors";
import {handleRequest} from "@/shared/helpers/controller/BaseExpressController";

export async function createHistory(payload: AddHistoryRecordPayload): Promise<HistoryItem> {
    const historyRepository = repositoryStore.get().getHistoryRepository();
    const newRecord: HistoryItem = {
        ...payload,
        calculationDate: new Date(),
        id: (new Date()).toDateString()
    };
    return await handleRequest<HistoryItem, HistoryItem>(historyRepository.create, newRecord, {
        zodValidation: addHistoryItemPayloadValidator,
        customValidation: validateHistoryAdd
    })
}

export async function validateHistoryAdd(payload: AddHistoryRecordPayload): Promise<void> {
    const historyRepository = repositoryStore.get().getHistoryRepository();
    const lastHistoryElement = (await historyRepository.findMany({
        pageNumber: 0,
        limit: 1,
    }))?.[0];

    if(isExpressionDuplicate(lastHistoryElement, payload.expression)) {
        throw new ServerError(
            HttpStatusCodes.BAD_REQUEST,
            ServerErrorCodes.VALIDATION_ERROR,
            "This expression is already the last record"
        );
    }
}

function isExpressionDuplicate(lastHistoryElement: HistoryItem | undefined, expression: string): boolean {
    return lastHistoryElement !== undefined && lastHistoryElement.expression === expression;
}