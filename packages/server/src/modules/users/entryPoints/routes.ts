import {RouteList} from "../../../router/types";
import {usersController} from "@/users/controller/UsersController";
import {Endpoints, MethodName} from "@calculator/common";

const routes: RouteList = [
    {
        method: MethodName.GET,
        endpoint: Endpoints.USERS_GET,
        callback: usersController.findUser,
    },
    {
        method: MethodName.POST,
        endpoint: Endpoints.USERS_ADD,
        callback: usersController.addUser,
    }
];

export default routes;