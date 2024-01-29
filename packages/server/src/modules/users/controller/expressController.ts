import {
    addUserPayloadValidation, Endpoints,
    GetUserListPayload,
    User,
} from "@calculator/common";
import {createExpressAction} from "@/shared/utils/expressAction";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {ExpressController} from "@/shared/types/controller";

const usersRepository = repositoryStore.get().getUsersRepository();

const usersController: ExpressController<Endpoints.USERS> = {
    get: createExpressAction<User[], GetUserListPayload>(usersRepository.findMany),
    post: createExpressAction<User, User>(usersRepository.create, {
        zodValidation: addUserPayloadValidation
    })
};

export default {
    [Endpoints.USERS]: usersController
};