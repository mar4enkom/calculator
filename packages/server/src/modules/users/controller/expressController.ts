import {
    AddUserPayload,
    addUserPayloadValidation, Endpoints, GetUserListPayload,
    User, UserList,
} from "@calculator/common";
import {createExpressCallback, handleExpressRequest} from "@/shared/helpers/controller/BaseExpressController";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";

const usersRepository = repositoryStore.get().getUsersRepository();

const usersController = {
    [Endpoints.USERS_GET]: createExpressCallback<UserList, GetUserListPayload>(usersRepository.find),
    [Endpoints.USERS_ADD]: createExpressCallback<User, AddUserPayload>(usersRepository.addItem, {
        zodValidation: addUserPayloadValidation
    })
};
export default usersController;