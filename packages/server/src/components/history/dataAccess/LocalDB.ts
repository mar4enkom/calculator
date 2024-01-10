import {Store} from "@/shared/store/helpers/store/Store";
import {compose} from "@calculator/common";
import {PaginationParams} from "@/shared/repository/types";

type OperationFunctionArgs<T extends Object> = [PaginationParams<T>, T[]];

export class LocalDB<T extends Object> {
    private db: Store<T[]> = new Store<T[]>([]);

    constructor(initialData: T[]) {
        this.db = new Store<T[]>(initialData)
    }

    find(params: PaginationParams<T>): Promise<T[]> {
        const findResults = compose(
            this.skip.bind(this),
            this.limit.bind(this),
            this.sortBy.bind(this)
        );

        const foundResults = findResults([params, this.db.get()]);
        return Promise.resolve(foundResults[1]);
    }

    private skip([params, lastResult]: OperationFunctionArgs<T>): OperationFunctionArgs<T> {
        if(params.pageNumber == null || params.limit == null) {
            return [params, lastResult];
        }
        return [params, lastResult.slice(params.pageNumber * params.limit)];
    }

    private limit([params, lastResult]: OperationFunctionArgs<T>): OperationFunctionArgs<T> {
        if(params.pageNumber == null || params.limit == null) {
            return [params, lastResult];
        }

        return [params, lastResult.slice(0, params.limit)];
    }

    private sortBy([params, lastResult]: OperationFunctionArgs<T>): OperationFunctionArgs<T> {
        if(params.sortBy == null) return [params, lastResult];
        const sortByField = params.sortBy;
        const dbCopy = [...lastResult];
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
        return [params, dbCopy];
    }
}