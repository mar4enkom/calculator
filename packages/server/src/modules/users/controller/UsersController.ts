import {
    addUserPayloadValidation,
    GetUserListPagination, GetUserListPayload,
    getUserListPayloadValidation,
    User,
} from "@calculator/common";
import {zParse} from "@/shared/utils/zParse";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {BaseExpressController} from "@/shared/controller/BaseExpressController";
import {ExpressParams} from "@/shared/controller/types";

class UsersController extends BaseExpressController<User, GetUserListPayload>{
    constructor() {
        const usersRepository = repositoryStore.get().getUsersRepository();
        super(usersRepository);

        this.findUser = this.findUser.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    async findUser(...args: ExpressParams<typeof this.find>): Promise<void> {
        await super.find(...args, {
            before(p: GetUserListPagination) {
                zParse(getUserListPayloadValidation, p)
            }
        });
    }
    async addUser(...args: ExpressParams<typeof this.addItem>): Promise<void> {
        await super.addItem(...args, {
            before(p: User) {
                zParse(addUserPayloadValidation, p);
            }
        });
    }
}

export const usersController = new UsersController();