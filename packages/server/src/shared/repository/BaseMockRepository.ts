import {BaseRepository} from "./types";

export abstract class BaseMockRepository<T> implements BaseRepository<T> {
    constructor(
        private readonly db: Array<any>,
    ) { }

    get queryBuilder(): T[] {
        return this.db;
    }

    findAll(): Promise<T[]> {
        return Promise.resolve(this.db);
    }

    findOne(id: string | Partial<T >): Promise<T> {
        return Promise.resolve(this.db.find(item => item.id === id));
    }
}