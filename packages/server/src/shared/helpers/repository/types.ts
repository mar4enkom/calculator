import {
    BasePaginationParams,
    GetHistoryPagination, GetUserListPagination,
    HistoryItem, User
} from "@calculator/common";

export type DBName = "localDB";

export interface BaseRepository<T, K extends BasePaginationParams> {
    findMany(p: K): Promise<T[]>;
    create(p: T): Promise<T>;
    count(): Promise<number>;
}

export interface HistoryRepository extends BaseRepository<HistoryItem, GetHistoryPagination> { }
export interface UsersRepository extends BaseRepository<User, GetUserListPagination>{ }

export interface RepositoryFactory {
    getHistoryRepository(): HistoryRepository;
    getUsersRepository(): UsersRepository;
}
