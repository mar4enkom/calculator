import {
    AddHistoryRecordPayload,
    CalculationHistory, GetHistoryPagination,
    HistoryItem
} from "@calculator/common";

export type DBName = "localDB";

export type PaginationParams<T extends Object> = {
    sortBy?: keyof T;
    pageNumber?: number;
    limit?: number;
} | undefined;

export interface HistoryRepository {
    find(p: GetHistoryPagination): Promise<CalculationHistory>;
    addItem(p: AddHistoryRecordPayload): Promise<HistoryItem>;
}

export interface RepositoryFactory {
    getHistoryRepository(): HistoryRepository;
}
