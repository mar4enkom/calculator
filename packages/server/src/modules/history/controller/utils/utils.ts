import {addHistoryItemPayloadValidator, AddHistoryRecordPayload, HistoryItem} from "@calculator/common";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {ServerError} from "@/shared/errors/ServerError";
import {HttpStatusCodes} from "@/shared/constants/httpStatusCodes";
import {ServerErrorCodes} from "@/shared/constants/serverErrors";
import {zParse} from "@/shared/utils/zParse";

export async function createHistoryRecord(payload: AddHistoryRecordPayload): Promise<HistoryItem> {
    const historyRepository = repositoryStore.get().getHistoryRepository();
    const newRecord: HistoryItem = {
        ...payload,
        createdAt: new Date(),
        id: (new Date()).toDateString()
    };

    zParse(addHistoryItemPayloadValidator, newRecord);
    await validateAddHistory(newRecord);

    return await historyRepository.create(newRecord);
}

async function validateAddHistory(payload: AddHistoryRecordPayload): Promise<void> {
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