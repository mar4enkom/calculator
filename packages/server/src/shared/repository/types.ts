import {
    AddHistoryRecordPayload,
    CalculationHistory, GetHistoryPagination, GetUserListPagination,
    HistoryItem, User, UserList
} from "@calculator/common";
import {LocalDB} from "@/history/dataAccess/LocalDB";

export type DBName = "localDB";

// TODO: move this to common
export type PaginationParams<T extends Object> = {
    //sortBy?: keyof T extends string ? keyof T : never;
    sortBy?: string;
    pageNumber?: number;
    limit?: number;
} | undefined;

interface BaseRepository<T, Pagination extends PaginationParams<any>> {
    find(p: Pagination): Promise<T[]>;
    addItem(p: T): Promise<T>;
    countItems(): Promise<number>;
}

export abstract class LocalDBBaseRepository<T extends Object, Pagination extends PaginationParams<any>> implements BaseRepository<T, Pagination> {
    constructor(
        private db: LocalDB<T>
    ) { }

    async find(params: Pagination): Promise<T[]> {
        return await this.db.find(params);
    }

    async addItem(newItem: T): Promise<T> {
        return await this.db.addItem(newItem);
    }

    async countItems(): Promise<number> {
        return await this.db.countItems();
    }
}

export interface HistoryRepository extends BaseRepository<HistoryItem, GetHistoryPagination> { }
export interface UsersRepository extends BaseRepository<User, GetUserListPagination>{ }

export interface RepositoryFactory {
    getHistoryRepository(): HistoryRepository;
    getUsersRepository(): UsersRepository;
}
