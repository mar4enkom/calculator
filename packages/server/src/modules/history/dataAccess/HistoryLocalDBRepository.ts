import {
    GetHistoryPagination,
    HistoryItem
} from "@calculator/common";
import {HistoryRepository} from "@/shared/helpers/repository/types";
import {LocalDB} from "@/shared/helpers/repository/concreteRepositories/LocalDB";
import {LocalDBBaseRepository} from "@/shared/helpers/repository/concreteRepositories/LocalDBBaseRepository";

export class HistoryLocalDBRepository
    extends LocalDBBaseRepository<HistoryItem, GetHistoryPagination>
    implements HistoryRepository {
    constructor(db: LocalDB<HistoryItem>) {
        super(db);
    }
}
