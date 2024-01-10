import {HistoryRepository, RepositoryFactory} from "@/shared/repository/types";
import {HistoryLocalDBRepository} from "@/history/dataAccess/HistoryLocalDBRepository";
import {LocalDB} from "@/history/dataAccess/LocalDB";
import {CalculationHistory, CalculationHistoryItem} from "@calculator/common";

export class LocalDBFactory implements RepositoryFactory {
    constructor(
        private readonly db: LocalDB<CalculationHistoryItem>
    ) { }

    createHistoryRepository(): HistoryRepository {
        return new HistoryLocalDBRepository(this.db);
    }
}