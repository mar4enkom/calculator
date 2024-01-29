import {
    addUserPayloadValidation, Endpoints,
    GetUserListPayload,
    User,
} from "@calculator/common";
import {createExpressAction} from "@/shared/utils/expressAction";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {BaseExpressController} from "@/shared/types/controller";

const usersRepository = repositoryStore.get().getUsersRepository();

type UsersController = BaseExpressController<User, GetUserListPayload>;

const usersController: UsersController = {
    get: createExpressAction(usersRepository.findMany),
    post: createExpressAction(usersRepository.create, {
        zodValidation: addUserPayloadValidation
    })
};

export default {
    [Endpoints.USERS]: usersController
};