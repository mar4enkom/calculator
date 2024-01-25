import {
    AddUserPayload,
    addUserPayloadValidation, Endpoints, GetUserListPayload,
    User, UserList,
} from "@calculator/common";
import {createExpressCallback, handleExpressRequest} from "@/shared/helpers/controller/BaseExpressController";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";

class UsersController {
    private repository = repositoryStore.get().getUsersRepository();
    constructor() {
        this[Endpoints.USERS_GET] = this[Endpoints.USERS_GET].bind(this);
        this[Endpoints.USERS_ADD] = this[Endpoints.USERS_ADD].bind(this);
    }

    [Endpoints.USERS_GET] = createExpressCallback<UserList, GetUserListPayload>(this.repository.find);
    [Endpoints.USERS_ADD] = createExpressCallback<User, AddUserPayload>(this.repository.addItem, {
        zodValidation: addUserPayloadValidation
    })
}

export default new UsersController();