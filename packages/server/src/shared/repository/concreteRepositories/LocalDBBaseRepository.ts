import {LocalDB} from "@/history/dataAccess/LocalDB";
import {BaseRepository} from "@/shared/repository/types";
import {BasePaginationParams} from "@calculator/common";

export abstract class LocalDBBaseRepository<
    T extends Object,
    Pagination extends BasePaginationParams
> implements BaseRepository<T, Pagination> {
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