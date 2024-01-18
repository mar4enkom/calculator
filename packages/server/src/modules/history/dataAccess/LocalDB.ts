import {PaginationParams} from "@/shared/repository/types";
import {composeFilters} from "@/shared/utils/composeFilters";
import {Store} from "@calculator/common";

export class LocalDB<T extends Object> {
    private db: Store<T[]> = new Store<T[]>([]);

    constructor(initialData: T[]) {
        this.db = new Store<T[]>(initialData)
    }

    async find(params: PaginationParams<T>): Promise<T[]> {
        if(params == null) return this.db.get();
        const foundResults = composeFilters(
            this.db.get.call(this.db),
            params,
            [this.skip.bind(this), this.limit.bind(this), this.sortBy.bind(this)]
        );

        return Promise.resolve(foundResults);
    }

    addItem(params: T): Promise<T> {
        const currentData = this.db.get();
        this.db.set([params, ...currentData]);

        return Promise.resolve(params);
    }

    countItems(): Promise<number> {
        return Promise.resolve(this.db.get().length);
    }

    private skip(data: T[], params: NonNullable<PaginationParams<T>>): T[] {
        if(params.pageNumber == null || params.limit == null) {
            return data;
        }
        return data.slice(params.pageNumber * params.limit);
    }

    private limit(data: T[], params: NonNullable<PaginationParams<T>>): T[] {
        if(params.pageNumber == null || params.limit == null) {
            return data;
        }

        return data.slice(0, params.limit);
    }

    private sortBy(data: T[], params: NonNullable<PaginationParams<T>>): T[] {
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