import {BaseRepository} from "@/shared/repository/types";
import {BasePaginationParams} from "@calculator/common";

type BaseRepositoryKeys = keyof BaseRepository<any, any>;

interface ControllerMethodProps<T> {
    before?(p: T): void;
}

type ControllerMethod<Method extends (...args: any) => any>
    = (a: Parameters<Method>[0], props?: ControllerMethodProps<Parameters<Method>[0]>) => ReturnType<Method>;

type BaseControllerInterface<T, K extends BasePaginationParams> = {
    [Key in BaseRepositoryKeys]: ControllerMethod<BaseRepository<T, K>[Key]>;
};

export abstract class BaseController<T, K extends BasePaginationParams> implements BaseControllerInterface<T, K> {
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

// export abstract class BaseExpressController<T, K extends BasePaginationParams> extends BaseController<T, K> {
//     constructor(repository: BaseRepository<T, K>) {
//         super(repository);
//     }
//
//     addItemC(req: RestRequestBody<T>,
//              res: RestResponse<GetUserListResponseBody>,
//              next: NextFunction
//     ): Promise<T> {
//         return super.addItem(p, {before});
//     }
//
//     countItems(): Promise<number> {
//         return super.countItems();
//     }
//
//     find(p: K, {before}: ControllerMethodProps<K>): Promise<T[]> {
//         return super.find(p, {before});
//     }
// }