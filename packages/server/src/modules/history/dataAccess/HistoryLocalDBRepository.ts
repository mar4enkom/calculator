import {
    AddHistoryRecordPayload,
    CalculationHistory, GetHistoryPagination,
    HistoryItem
} from "@calculator/common";
import {HistoryRepository} from "@/shared/repository/types";
import {LocalDB} from "@/history/dataAccess/LocalDB";

export class HistoryLocalDBRepository implements HistoryRepository {
    constructor(
        private db: LocalDB<HistoryItem>
    ) { }
    async find(params: GetHistoryPagination): Promise<CalculationHistory> {
        return await this.db.find(params);
    }

    async addItem(params: AddHistoryRecordPayload): Promise<HistoryItem> {
        return await this.db.addItem({
            ...params,
            calculationDate: new Date(),
            id: (new Date()).toDateString()
        });
    }

    async countItems(): Promise<number> {
        return await this.db.countItems();
    }
}
