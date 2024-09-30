import {HistoryRepository, RepositoryFactory, UsersRepository} from "@/shared/helpers/repository/types";
import {HistoryLocalDBRepository} from "@/history/dataAccess/HistoryLocalDBRepository";
import {UsersLocalDBRepository} from "@/users/dataAccess/UsersLocalDBRepository";

export class LocalDBFactory implements RepositoryFactory {
    getHistoryRepository(): HistoryRepository {
        return new HistoryLocalDBRepository();
    }

    getUsersRepository(): UsersRepository {
        return new UsersLocalDBRepository();
    }
}