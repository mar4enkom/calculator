import {
    BasePaginationParams,
    GetHistoryPagination, GetUserListPagination,
    HistoryItem, User
} from "@calculator/common";

export type DBName = "localDB";

export type UpdateArgs<T> = {
    where: Partial<T>,
    data: T;
}

export type DeleteArgs<T> = {
    where: Partial<T>,
}

export type FindArgs<T> = {
    where: Partial<T>,
}

export interface BaseRepository<T, K extends BasePaginationParams> {
    find(p: FindArgs<T>): Promise<T | undefined>;
    findMany(p: K): Promise<T[]>;
    update(payload: UpdateArgs<T>): Promise<T | undefined>;
    create(p: T): Promise<T>;
    count(): Promise<number>;
}

export interface HistoryRepository extends BaseRepository<HistoryItem, GetHistoryPagination> { }
export interface UsersRepository extends BaseRepository<User, GetUserListPagination>{ }

export interface RepositoryFactory {
    getHistoryRepository(): HistoryRepository;
    getUsersRepository(): UsersRepository;
}
