import {BaseRepository} from "@/shared/repository/types";
import {BasePaginationParams} from "@calculator/common";
import {BaseRepositoryKeys, BaseRepositoryMethod, ControllerMethodProps} from "@/shared/controller/types";

type BaseControllerMethod<Method extends BaseRepositoryMethod> = (
    a: Parameters<Method>[0],
    props?: ControllerMethodProps<Parameters<Method>[0]>
) => ReturnType<Method>;

type BaseControllerInterface<T, K extends BasePaginationParams> = {
    [Key in BaseRepositoryKeys]: BaseControllerMethod<BaseRepository<T, K>[Key]>;
};

export class BaseController<T, K extends BasePaginationParams> implements BaseControllerInterface<T, K> {
    private repository: BaseRepository<T, K>;
    constructor(repository: BaseRepository<T, K>) {
        this.repository = repository;

        this.find = this.find.bind(this);
    }
    find(p: K, props?: ControllerMethodProps<K>): Promise<T[]> {
        props?.before?.(p);
        return this.repository.find(p);
    }
    addItem(p: T, props?: ControllerMethodProps<T>): Promise<T> {
        props?.before?.(p);
        return this.repository.addItem(p);
    }

    countItems(): Promise<number> {
        return this.repository.countItems();
    }
}
