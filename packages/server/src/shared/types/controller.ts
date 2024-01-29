import {BasePaginationParams, CommonRoutes, commonRoutes, Endpoints} from "@calculator/common";
import {ExpressCallback} from "@/shared/utils/expressAction";
import {DeleteArgs, UpdateArgs} from "@/shared/helpers/repository/types";

export type ExpressController<Endpoint extends Endpoints> = {
    [M in CommonRoutes[Endpoint]['httpMethods'][number]]:
        M extends "get" ? ExpressCallback<any, any>
            : M extends "post" ? ExpressCallback<any, any>
            : M extends "put" ? ExpressCallback<any, UpdateArgs<any>>
            : M extends "delete" ? ExpressCallback<any, DeleteArgs<any>>
            : never;
}