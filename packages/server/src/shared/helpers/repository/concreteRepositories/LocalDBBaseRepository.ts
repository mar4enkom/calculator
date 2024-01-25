import {LocalDB} from "@/shared/helpers/repository/concreteRepositories/LocalDB";
import {BaseRepository} from "@/shared/helpers/repository/types";
import {BasePaginationParams} from "@calculator/common";

export abstract class LocalDBBaseRepository<
    T extends Object,
    Pagination extends BasePaginationParams
> implements BaseRepository<T, Pagination> {
    constructor(private db: LocalDB<T>) {
        this.find = this.find.bind(this);
        this.addItem = this.addItem.bind(this);
        this.countItems = this.countItems.bind(this);
    }

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