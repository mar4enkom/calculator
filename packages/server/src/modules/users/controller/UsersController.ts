import {
    addUserPayloadValidation,
    GetUserListPagination,
    getUserListPayloadValidation,
    User,
} from "@calculator/common";
import {zParse} from "@/shared/utils/zParse";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {BaseExpressController, ExpressParams} from "@/shared/controller/BaseController";

class UsersController extends BaseExpressController<User, GetUserListPagination>{
    constructor() {
        const usersRepository = repositoryStore.get().getUsersRepository();
        super(usersRepository);

        this.getList = this.getList.bind(this);
        this.addUser = this.addUser.bind(this);
    }
    async getList(...args: ExpressParams<typeof this.find>): Promise<void> {
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