import {composeFilters} from "@/shared/utils/composeFilters";
import {BasePaginationParams, Store} from "@calculator/common";
import {FindArgs, UpdateArgs} from "@/shared/helpers/repository/types";

export class LocalDB<T extends Object> {
    private db: Store<T[]> = new Store<T[]>([]);

    constructor(initialData: T[]) {
        this.db = new Store<T[]>(initialData)
    }

    async find({ where }: FindArgs<T>): Promise<T | undefined> {
        const currentData = this.db.get();
        const foundItem = currentData.find(item => this.isMatch(item, where));

        return Promise.resolve(foundItem);
    }

    async findMany(params: BasePaginationParams): Promise<T[]> {
        if(params == null) return this.db.get();
        const foundResults = composeFilters(
            this.db.get.call(this.db),
            params,
            [this.skip.bind(this), this.limit.bind(this), this.sortBy.bind(this)]
        );

        return Promise.resolve(foundResults);
    }

    async create(params: T): Promise<T> {
        const currentData = this.db.get();
        this.db.set([params, ...currentData]);

        return Promise.resolve(params);
    }

    async update({ where, data }: UpdateArgs<T>): Promise<T | undefined> {
        const currentData = this.db.get();
        const index = currentData.findIndex(item => this.isMatch(item, where));

        if (index > -1) return Promise.resolve(undefined);

        currentData[index] = { ...currentData[index], ...data };
        this.db.set(currentData);
        return Promise.resolve(currentData[index]);
    }

    private isMatch(item: T, where: Partial<T>): boolean {
        for (const key in where) {
            if (where[key] != null && item[key] !== where[key]) {
                return false;
            }
        }
        return true;
    }

    async count(): Promise<number> {
        return Promise.resolve(this.db.get().length);
    }

    private skip(data: T[], params: NonNullable<BasePaginationParams>): T[] {
        if(params.pageNumber == null || params.limit == null) {
            return data;
        }
        return data.slice(params.pageNumber * params.limit);
    }

    private limit(data: T[], params: NonNullable<BasePaginationParams>): T[] {
        if(params.pageNumber == null || params.limit == null) {
            return data;
        }

        return data.slice(0, params.limit);
    }

    private sortBy(data: T[], params: NonNullable<BasePaginationParams>): T[] {
        if(params.sortBy == null) return data;
        const sortByField = params.sortBy;
        const dbCopy = [...data];
        dbCopy.sort((a, b) => {
            const fieldValueA = a[sortByField as keyof typeof a];
            const fieldValueB = b[sortByField as keyof typeof a];

            if (fieldValueA instanceof Date && fieldValueB instanceof Date) {
                return fieldValueB.getTime() - fieldValueA.getTime();
            }

            if (fieldValueA < fieldValueB) {
                return 1;
            }
            if (fieldValueA > fieldValueB) {
                return -1;
            }
            return 0;
        });
        return dbCopy;
    }
}