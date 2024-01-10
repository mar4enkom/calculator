import {Store} from "@/shared/store/helpers/store/Store";
import {compose} from "@calculator/common";
import {PaginationParams} from "@/shared/repository/types";

export class LocalDB<T extends Object> {
    private db: Store<T[]> = new Store<T[]>([])

    constructor(initialData: T[]) {
        this.db = new Store<T[]>(initialData)
    }

    find(params: PaginationParams<T>): Promise<T[]> {
        const findResults = compose(this.skip, this.limit, this.sortBy);
        const foundResults = findResults(params);
        return Promise.resolve(foundResults);
    }

    private skip(params: PaginationParams<T>): T[] {
        if(params.pageNumber == null || params.limit == null) {
            return this.db.get();
        }
        return this.db.get().slice(params.pageNumber * params.limit);
    }

    private limit(params: PaginationParams<T>): T[] {
        if(params.pageNumber == null || params.limit == null) {
            return this.db.get();
        }
        return this.db.get().slice(0, params.limit);
    }

    private sortBy(params: PaginationParams<T>): T[] {
        if(params.sortBy == null) return this.db.get();
        const sortByField = params.sortBy;
        const dbCopy = [...this.db.get()];
        dbCopy.sort((a, b) => {
            const fieldValueA = a[sortByField];
            const fieldValueB = b[sortByField];

            if (fieldValueA < fieldValueB) {
                return -1;
            }
            if (fieldValueA > fieldValueB) {
                return 1;
            }
            return 0;
        });
        return dbCopy;
    }
}