import {CalculationHistory, HistoryItem} from "@calculator/common";
import {HistoryRepository, PaginationParams} from "@/shared/repository/types";
import {LocalDB} from "@/history/dataAccess/LocalDB";

export class HistoryLocalDBRepository implements HistoryRepository {
    constructor(
        private db: LocalDB<HistoryItem>
    ) { }
    find(params: PaginationParams<HistoryItem>): Promise<CalculationHistory> {
        return Promise.resolve(this.db.find(params));
    }
}
