import {
    AddUserPayload,
    addUserPayloadValidation, GetUserListPayload,
    User, UserList,
} from "@calculator/common";
import {createExpressCallback, handleExpressRequest} from "@/shared/helpers/controller/BaseExpressController";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {ExpressParams} from "@/shared/types/express";

class UsersController{
    private repository = repositoryStore.get().getUsersRepository();
    constructor() {
        this.findUser = this.findUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    findUser = createExpressCallback<UserList, GetUserListPayload>(this.repository.find);
    addUser = createExpressCallback<User, AddUserPayload>(this.repository.addItem, {
        zodValidation: addUserPayloadValidation
    })
}

export const usersController
    = new UsersController();