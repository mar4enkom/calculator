import {RouteList} from "../../../router/fileBasedRouter/types";
import usersController from "@/users/controller/expressController";
import {Endpoints, MethodName} from "@calculator/common";

const routes: RouteList = [
    {
        method: MethodName.GET,
        endpoint: Endpoints.USERS_GET,
        callback: usersController[Endpoints.USERS_GET],
    },
    {
        method: MethodName.POST,
        endpoint: Endpoints.USERS_ADD,
        callback: usersController[Endpoints.USERS_ADD],
    }
];

export default routes;