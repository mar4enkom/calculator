import {
    AddHistoryRecordPayload,
    CalculationHistory, GetHistoryPagination,
    HistoryItem
} from "@calculator/common";
import {HistoryRepository, LocalDBBaseRepository} from "@/shared/repository/types";
import {LocalDB} from "@/history/dataAccess/LocalDB";

export class HistoryLocalDBRepository extends LocalDBBaseRepository<HistoryItem, GetHistoryPagination> implements HistoryRepository {
    constructor(db: LocalDB<HistoryItem>) {
        super(db);
    }
}
