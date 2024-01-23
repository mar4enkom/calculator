import {
    addUserPayloadValidation,
    GetUserListPayload,
    getUserListPayloadValidation,
    User,
} from "@calculator/common";
import {BaseOrmExpressController} from "@/shared/helpers/controller/BaseOrmExpressController";
import {ExpressParams} from "@/shared/helpers/controller/types";
import {repositoryOrmFactory, UsersOrm} from "@/shared/helpers/orm/RepositoryOrmFactory";

class UsersController extends BaseOrmExpressController<User, GetUserListPayload>{
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