import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {
    AddUserPayload, addUserPayloadValidation, AddUserResponseBody,
    GetUserListPayload,
    getUserListPayloadValidation,
    GetUserListResponseBody,
} from "@calculator/common";
import {NextFunction} from "express";
import {zParse} from "@/shared/utils/zParse";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";

class UsersController {
    async getList(
        req: RestRequestBody<GetUserListPayload>,
        res: RestResponse<GetUserListResponseBody>,
        next: NextFunction
    ): Promise<void> {
        try {
            const payload = zParse(getUserListPayloadValidation, req);

            const usersRepository = repositoryStore.get().getUsersRepository();
            const lastRecords = await usersRepository.find(payload);
            sendSuccessResponse(res, lastRecords);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
    async addItem(
        req: RestRequestBody<AddUserPayload>,
        res: RestResponse<AddUserResponseBody>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const payload = zParse(addUserPayloadValidation, req);
            const usersRepository = repositoryStore.get().getUsersRepository();
            const newRecord = await usersRepository.addItem(payload);

            sendSuccessResponse(res, newRecord);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const usersController = new UsersController();