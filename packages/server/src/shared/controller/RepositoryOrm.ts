import {BaseRepository} from "@/shared/repository/types";
import {BasePaginationParams} from "@calculator/common";
import {BaseRepositoryKeys, BaseRepositoryMethod, OrmMethodProps} from "@/shared/controller/types";
import {zParse} from "@/shared/utils/zParse";

type BaseOrmMethod<Method extends BaseRepositoryMethod> = (
    a: Parameters<Method>[0],
    props?: OrmMethodProps<Parameters<Method>[0]>
) => ReturnType<Method>;

type OrmInterface<T, K extends BasePaginationParams> = {
    [Key in BaseRepositoryKeys]: BaseOrmMethod<BaseRepository<T, K>[Key]>;
};

export class RepositoryOrm<T, K extends BasePaginationParams> implements OrmInterface<T, K> {
    constructor(
        private repository: BaseRepository<T, K> = repository
    ) { }
    find(p: K, props?: OrmMethodProps<K>): Promise<T[]> {
        this.beforeOperation(p, props);
        return this.repository.find(p);
    }
    addItem(p: T, props?: OrmMethodProps<T>): Promise<T> {
        this.beforeOperation(p, props);
        return this.repository.addItem(p);
    }

    countItems(): Promise<number> {
        return this.repository.countItems();
    }

    private beforeOperation<P>(p: P, props?: OrmMethodProps<P>): void {
        props?.before?.(p);

        if(props?.zodValidation != null) {
            zParse(props.zodValidation, p!)
        }
    }
}
