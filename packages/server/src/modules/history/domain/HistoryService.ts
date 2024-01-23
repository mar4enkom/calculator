import {AddHistoryRecordPayload} from "@calculator/common";
import {ServerError} from "@/shared/errors/ServerError";
import {HttpStatusCodes} from "@/shared/constants/httpStatusCodes";
import {ServerErrorCodes} from "@/shared/constants/serverErrors";
import {HistoryOrm, repositoryOrmFactory} from "@/shared/orm/RepositoryOrmFactory";

class HistoryService {
    constructor(
        private orm: HistoryOrm = orm
    ) { }

    async validatePayload(payload: AddHistoryRecordPayload) {
        const lastHistoryElement = (await this.orm.find({
            pageNumber: 0,
            limit: 1,
        }))?.[0];

        if(lastHistoryElement != null && lastHistoryElement?.expression === payload.expression) {
            throw new ServerError(
                HttpStatusCodes.BAD_REQUEST,
                ServerErrorCodes.VALIDATION_ERROR,
                "This expression is already the last record"
            );
        }
    }
}

export const historyService =
    new HistoryService(repositoryOrmFactory.getHistoryOrm());