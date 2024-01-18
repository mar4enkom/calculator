import {
    BasePaginationParams,
    GetHistoryPagination, GetUserListPagination,
    HistoryItem, User
} from "@calculator/common";

export type DBName = "localDB";

export interface BaseRepository<T, Pagination extends BasePaginationParams> {
    find(p: Pagination): Promise<T[]>;
    addItem(p: T): Promise<T>;
    countItems(): Promise<number>;
}

export interface HistoryRepository extends BaseRepository<HistoryItem, GetHistoryPagination> { }
export interface UsersRepository extends BaseRepository<User, GetUserListPagination>{ }

export interface RepositoryFactory {
    getHistoryRepository(): HistoryRepository;
    getUsersRepository(): UsersRepository;
}
