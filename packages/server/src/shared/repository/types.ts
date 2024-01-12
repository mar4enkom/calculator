import {CalculationHistory, HistoryItem} from "@calculator/common";

export type DBName = "localDB";

export interface PaginationParams<T extends Object> {
    sortBy?: keyof T;
    pageNumber?: number;
    limit?: number;
}

export interface HistoryRepository {
    find(p: PaginationParams<HistoryItem>): Promise<CalculationHistory>;
}

export interface RepositoryFactory {
    createHistoryRepository(): HistoryRepository;
}
