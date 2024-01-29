import {
    GetHistoryPagination,
    HistoryItem
} from "@calculator/common";
import {HistoryRepository} from "@/shared/helpers/repository/types";
import {LocalDB} from "@/shared/helpers/repository/concreteRepositories/LocalDB";
import {LocalDBBaseRepository} from "@/shared/helpers/repository/concreteRepositories/LocalDBBaseRepository";
import {mockedHistory} from "@/shared/helpers/repository/concreteRepositories/mocks";

const db: LocalDB<HistoryItem> = new LocalDB(mockedHistory);

export class HistoryLocalDBRepository
    extends LocalDBBaseRepository<HistoryItem, GetHistoryPagination>
    implements HistoryRepository {
    constructor() {
        super(db);
    }
}
