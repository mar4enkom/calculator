import {BaseRepository} from "@/shared/repository/types";
import {BasePaginationParams} from "@calculator/common";
import {RestRequest, RestResponse} from "@/shared/types/express";
import {NextFunction} from "express";
import {getRequestBody} from "@/shared/utils/getRequestBody";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";

type BaseRepositoryKeys = keyof BaseRepository<any, any>;

interface ControllerMethodProps<T> {
    before?(p: T): void;
}

type BaseRepositoryMethod = (params: any) => Promise<any>;

type BaseControllerMethod<Method extends BaseRepositoryMethod> = (
    a: Parameters<Method>[0],
    props?: ControllerMethodProps<Parameters<Method>[0]>
) => ReturnType<Method>;

type BaseControllerInterface<T, K extends BasePaginationParams> = {
    [Key in BaseRepositoryKeys]: BaseControllerMethod<BaseRepository<T, K>[Key]>;
};

// ------
export type ExpressParams<T extends (...args: [any, any, any, ...any[]]) => any> = [
    Parameters<T>[0],
    Parameters<T>[1],
    Parameters<T>[2],
];
type BaseExpressControllerMethod<Method extends BaseRepositoryMethod> = (
    req: RestRequest<Parameters<Method>[0]>,
    res: RestResponse<Awaited<ReturnType<Method>>>,
    next: NextFunction,
    props?: ControllerMethodProps<Parameters<Method>[0]>
) => Promise<void>;

type BaseExpressControllerInterface<T, K extends BasePaginationParams> = {
    [Key in BaseRepositoryKeys]: BaseExpressControllerMethod<BaseRepository<T, K>[Key]>;
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

    countItems(props?: ControllerMethodProps<T>): Promise<number> {
        //props?.before?.(undefined);
        return this.repository.countItems();
    }
}

export abstract class BaseExpressController<T, K extends BasePaginationParams> implements BaseExpressControllerInterface<T, K> {
    private baseController: BaseController<T, K>;
    constructor(repository: BaseRepository<T, K>) {
        this.baseController = new BaseController(repository);
    }

    async addItem(
        req: RestRequest<T>,
        res: RestResponse<Awaited<T>>,
        next: NextFunction,
        props?: ControllerMethodProps<T>
    ): Promise<void> {
        try {
            const reqBody = getRequestBody(req);
            const result = await this.baseController.addItem(reqBody, props);
            sendSuccessResponse(res, result);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }

    async find(
        req: RestRequest<K>,
        res: RestResponse<Awaited<T[]>>,
        next: NextFunction,
        props?: ControllerMethodProps<K>
    ): Promise<void> {
        try {
            const reqBody = getRequestBody(req);
            const result = await this.baseController.find(reqBody, props);
            sendSuccessResponse(res, result);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }

    async countItems(
        _req: RestRequest<undefined>,
        res: RestResponse<Awaited<number>>,
        next: NextFunction,
        _props?: ControllerMethodProps<undefined>
    ): Promise<void> {
        try {
            const result = await this.baseController.countItems();
            sendSuccessResponse(res, result);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}