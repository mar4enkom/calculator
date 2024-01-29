import {
    AddUserPayload,
    addUserPayloadValidation, Endpoints, GetUserListPayload,
    User, UserList,
} from "@calculator/common";
import {createExpressAction} from "@/shared/helpers/controller/BaseExpressController";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";

const usersRepository = repositoryStore.get().getUsersRepository();

const usersController = {
    [Endpoints.USERS_GET]: createExpressAction<UserList, GetUserListPayload>(usersRepository.findMany),
    [Endpoints.USERS_ADD]: createExpressAction<User, AddUserPayload>(usersRepository.create, {
        zodValidation: addUserPayloadValidation
    })
};
export default usersController;