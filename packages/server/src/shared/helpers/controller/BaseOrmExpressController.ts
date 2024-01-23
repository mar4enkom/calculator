import {BasePaginationParams, getHistoryPayloadValidator} from "@calculator/common";
import {BaseRepository} from "@/shared/helpers/repository/types";
import {RestRequest, RestResponse} from "@/shared/types/express";
import {NextFunction} from "express";
import {getRequestBody} from "@/shared/utils/getRequestBody";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {RepositoryOrm} from "@/shared/helpers/orm/RepositoryOrm";
import {BaseRepositoryKeys, BaseRepositoryMethod, OrmMethodProps} from "@/shared/helpers/controller/types";
import {BaseExpressController} from "@/shared/helpers/controller/BaseExpressController";

type BaseExpressControllerMethod<Method extends BaseRepositoryMethod> = (
    req: RestRequest<Parameters<Method>[0]>,
    res: RestResponse<Awaited<ReturnType<Method>>>,
    next: NextFunction,
    props?: OrmMethodProps<Parameters<Method>[0]>
) => Promise<void>;

type BaseExpressControllerInterface<T, K extends BasePaginationParams> = {
    [Key in BaseRepositoryKeys]: BaseExpressControllerMethod<BaseRepository<T, K>[Key]>;
};

export abstract class BaseOrmExpressController<T, K extends BasePaginationParams>
    extends BaseExpressController
    implements BaseExpressControllerInterface<T, K> {
    constructor(
        protected orm: RepositoryOrm<T, K>
    ) {
        super();
    }

    async addItem(
        req: RestRequest<T>,
        res: RestResponse<Awaited<T>>,
        next: NextFunction,
        props?: OrmMethodProps<T>
    ): Promise<void> {
        try {
            const reqBody = getRequestBody(req);
            const result = await this.orm.addItem(reqBody, props);
            sendSuccessResponse(res, result);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }

    async find(
        req: RestRequest<K>,
        res: RestResponse<Awaited<T[]>>,
        next: NextFunction,
        props?: OrmMethodProps<K>
    ): Promise<void> {
        try {
            const reqBody = getRequestBody(req);
            const result = await this.orm.find(reqBody, props);
            sendSuccessResponse(res, result);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }

    async countItems(
        _req: RestRequest<undefined>,
        res: RestResponse<Awaited<number>>,
        next: NextFunction,
        _props?: OrmMethodProps<undefined>
    ): Promise<void> {
        try {
            const result = await this.orm.countItems();
            sendSuccessResponse(res, result);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}