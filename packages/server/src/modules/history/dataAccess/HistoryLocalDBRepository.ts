import {
    GetHistoryPagination,
    HistoryItem
} from "@calculator/common";
import {HistoryRepository} from "@/shared/repository/types";
import {LocalDB} from "@/history/dataAccess/LocalDB";
import {LocalDBBaseRepository} from "@/shared/repository/concreteRepositories/LocalDBBaseRepository";

export class HistoryLocalDBRepository
    extends LocalDBBaseRepository<HistoryItem, GetHistoryPagination>
    implements HistoryRepository {
    constructor(db: LocalDB<HistoryItem>) {
        super(db);
    }
}
