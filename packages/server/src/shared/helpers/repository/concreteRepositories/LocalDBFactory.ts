import {HistoryRepository, RepositoryFactory, UsersRepository} from "@/shared/helpers/repository/types";
import {HistoryLocalDBRepository} from "@/history/dataAccess/HistoryLocalDBRepository";
import {LocalDB} from "@/shared/helpers/repository/concreteRepositories/LocalDB";
import {HistoryItem, User} from "@calculator/common";
import {UsersLocalDBRepository} from "@/users/dataAccess/UsersLocalDBRepository";
import {mockedHistory, mockedUsers} from "@/shared/helpers/repository/concreteRepositories/mocks";


export class LocalDBFactory implements RepositoryFactory {
    private readonly historyTable = new LocalDB<HistoryItem>(mockedHistory)
    private readonly usersTable = new LocalDB<User>(mockedUsers)

    getHistoryRepository(): HistoryRepository {
        return new HistoryLocalDBRepository(this.historyTable);
    }

    getUsersRepository(): UsersRepository {
        return new UsersLocalDBRepository(this.usersTable);
    }
}