import {BasePaginationParams} from "@calculator/common";
import {BaseRepository} from "@/shared/repository/types";
import {RestRequest, RestResponse} from "@/shared/types/express";
import {NextFunction} from "express";
import {getRequestBody} from "@/shared/utils/getRequestBody";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {BaseController} from "@/shared/controller/BaseController";
import {BaseRepositoryKeys, BaseRepositoryMethod, ControllerMethodProps} from "@/shared/controller/types";

type BaseExpressControllerMethod<Method extends BaseRepositoryMethod> = (
    req: RestRequest<Parameters<Method>[0]>,
    res: RestResponse<Awaited<ReturnType<Method>>>,
    next: NextFunction,
    props?: ControllerMethodProps<Parameters<Method>[0]>
) => Promise<void>;

type BaseExpressControllerInterface<T, K extends BasePaginationParams> = {
    [Key in BaseRepositoryKeys]: BaseExpressControllerMethod<BaseRepository<T, K>[Key]>;
};

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