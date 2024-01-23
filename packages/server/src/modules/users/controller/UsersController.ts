import {
    addUserPayloadValidation,
    GetUserListPayload,
    getUserListPayloadValidation,
    User,
} from "@calculator/common";
import {BaseExpressController} from "@/shared/controller/BaseExpressController";
import {ExpressParams} from "@/shared/controller/types";
import {repositoryOrmFactory, UsersOrm} from "@/shared/orm/RepositoryOrmFactory";

class UsersController extends BaseExpressController<User, GetUserListPayload>{
    constructor(usersOrm: UsersOrm) {
        super(usersOrm);

        this.findUser = this.findUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    async findUser(...args: ExpressParams<typeof this.find>): Promise<void> {
        await super.find(...args, { zodValidation: getUserListPayloadValidation });
    }
    async addUser(...args: ExpressParams<typeof this.addItem>): Promise<void> {
        await super.addItem(...args, { zodValidation: addUserPayloadValidation });
    }
}

export const usersController
    = new UsersController(repositoryOrmFactory.getUsersOrm());