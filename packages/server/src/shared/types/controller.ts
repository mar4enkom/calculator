import {BasePaginationParams, CommonRoutes, commonRoutes, Endpoints} from "@calculator/common";
import {ExpressCallback} from "@/shared/utils/expressAction";
import {DeleteArgs, UpdateArgs} from "@/shared/helpers/repository/types";


export type ExpressController<
    Endpoint extends Endpoints,
    T = any,
    Pagination extends BasePaginationParams = any,
    GetRequest = any,
    PostRequest = T
> = {
    [M in CommonRoutes[Endpoint]['httpMethods'][number]]:
        M extends "get" ? ExpressCallback<GetRequest, Pagination>
            : M extends "post" ? ExpressCallback<PostRequest, T>
            : M extends "put" ? ExpressCallback<T, UpdateArgs<T>>
            : M extends "delete" ? ExpressCallback<T, DeleteArgs<T>>
            : never;
}