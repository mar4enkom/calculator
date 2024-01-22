import {RouteList} from "../../../router/types";
import {usersController} from "@/users/controller/UsersController";
import {Endpoints} from "@calculator/common";

const routes: RouteList = [
    {
        method: "get",
        endpoint: Endpoints.USERS_GET,
        callback: usersController.findUser,
    },
    {
        method: "post",
        endpoint: Endpoints.USERS_ADD,
        callback: usersController.addUser,
    }
];

export default routes;