import {LocalDB} from "@/shared/helpers/repository/concreteRepositories/LocalDB";
import {BaseRepository, FindArgs, UpdateArgs} from "@/shared/helpers/repository/types";
import {BasePaginationParams} from "@calculator/common";
import {undefined} from "zod";

export abstract class LocalDBBaseRepository<
    T extends Object,
    Pagination extends BasePaginationParams
> implements BaseRepository<T, Pagination> {
    constructor(private db: LocalDB<T>) {
        this.findMany = this.findMany.bind(this);
        this.find = this.find.bind(this);
        this.update = this.update.bind(this);
        this.create = this.create.bind(this);
        this.count = this.count.bind(this);
    }

    async findMany(params: Pagination): Promise<T[]> {
        return await this.db.findMany(params);
    }

    async create(newItem: T): Promise<T> {
        return await this.db.create(newItem);
    }

    async count(): Promise<number> {
        return await this.db.count();
    }

    async find(payload: FindArgs<T>): Promise<T | undefined> {
        return await this.db.find(payload);
    }

    async update(payload: UpdateArgs<T>): Promise<T | undefined> {
        return await this.db.update(payload);
    }
}