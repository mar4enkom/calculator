import {BasePaginationParams} from "@calculator/common";
import {ExpressCallback} from "@/shared/helpers/controller/BaseExpressController";
import {DeleteArgs, UpdateArgs} from "@/shared/helpers/repository/types";

export type BaseExpressController<T, Pagination extends BasePaginationParams = any, GetReturn = T[], PostPayload = T> = Partial<{
    get: ExpressCallback<GetReturn, Pagination>;
    post: ExpressCallback<T, PostPayload>;
    put: ExpressCallback<T | undefined, UpdateArgs<T>>;
    delete: ExpressCallback<T, DeleteArgs<T>>
}>