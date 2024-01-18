import {HistoryRepository, RepositoryFactory, UsersRepository} from "@/shared/repository/types";
import {HistoryLocalDBRepository} from "@/history/dataAccess/HistoryLocalDBRepository";
import {LocalDB} from "@/history/dataAccess/LocalDB";
import {HistoryItem, User} from "@calculator/common";
import {UsersLocalDBRepository} from "@/users/dataAccess/UsersLocalDBRepository";
import {mockedHistory, mockedUsers} from "@/shared/repository/concreteRepositories/mocks";


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