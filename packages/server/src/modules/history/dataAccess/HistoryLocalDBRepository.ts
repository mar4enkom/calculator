import {
    GetHistoryPagination,
    HistoryItem
} from "@calculator/common";
import {HistoryRepository} from "@/shared/helpers/repository/types";
import {LocalDB} from "@/shared/helpers/repository/concreteRepositories/LocalDB";
import {LocalDBBaseRepository} from "@/shared/helpers/repository/concreteRepositories/LocalDBBaseRepository";
import {mockedHistory} from "@/shared/helpers/repository/concreteRepositories/mocks";

export class HistoryLocalDBRepository
    extends LocalDBBaseRepository<HistoryItem, GetHistoryPagination>
    implements HistoryRepository {
    constructor() {
        const db: LocalDB<HistoryItem> = new LocalDB(mockedHistory);
        super(db);
    }
}
