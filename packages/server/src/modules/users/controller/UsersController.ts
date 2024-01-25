import {
    AddUserPayload,
    addUserPayloadValidation, GetUserListPayload,
    User, UserList,
} from "@calculator/common";
import {handleExpressRequest} from "@/shared/helpers/controller/BaseExpressController";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {ExpressParams} from "@/shared/types/express";

class UsersController{
    private repository = repositoryStore.get().getUsersRepository();
    constructor() {
        this.findUser = this.findUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    async findUser(...args: ExpressParams<GetUserListPayload, UserList>): Promise<void> {
        await handleExpressRequest<UserList, GetUserListPayload>(...args, this.repository.find);
    }
    async addUser(...args: ExpressParams<AddUserPayload, User>): Promise<void> {
        await handleExpressRequest<User, AddUserPayload>(...args, this.repository.addItem, {
            zodValidation: addUserPayloadValidation
        });
    }
}

export const usersController
    = new UsersController();