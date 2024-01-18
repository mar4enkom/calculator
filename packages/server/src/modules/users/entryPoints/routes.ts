import {RouteList} from "../../../router/types";
import {usersController} from "@/users/controller/UsersController";
import {Endpoints} from "@calculator/common";

const routes: RouteList = [
    {
        method: "get",
        endpoint: Endpoints.GET_USERS,
        callback: usersController.getList,
    },
    {
        method: "post",
        endpoint: Endpoints.GET_USERS,
        callback: usersController.addUser,
    }
];

export default routes;