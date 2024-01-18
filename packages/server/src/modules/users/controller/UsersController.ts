import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {
    AddUserPayload, addUserPayloadValidation, AddUserResponseBody, GetUserListPagination,
    GetUserListPayload,
    getUserListPayloadValidation,
    GetUserListResponseBody, User,
} from "@calculator/common";
import {NextFunction} from "express";
import {zParse} from "@/shared/utils/zParse";
import {repositoryStore} from "@/shared/store/repositoryStore/repositoryStore";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {BaseController} from "@/shared/controller/BaseController";

class UsersController extends BaseController<User, GetUserListPagination>{
    constructor() {
        const usersRepository = repositoryStore.get().getUsersRepository();
        super(usersRepository);

        this.getList = this.getList.bind(this);
    }
    async getList(
        req: RestRequestBody<GetUserListPayload>,
        res: RestResponse<GetUserListResponseBody>,
        next: NextFunction
    ): Promise<void> {
        try {
            const lastRecords = await super.find(req.body, {
                before(p: GetUserListPagination) {
                    zParse(getUserListPayloadValidation, req)
                }
            });
            sendSuccessResponse(res, lastRecords);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
    async addUser(
        req: RestRequestBody<AddUserPayload>,
        res: RestResponse<AddUserResponseBody>,
        next: NextFunction,
    ): Promise<void> {
        try {
            const newRecord = await super.addItem(req.body, {
                before(p: User) {
                    zParse(addUserPayloadValidation, req);
                }
            });

            sendSuccessResponse(res, newRecord);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const usersController = new UsersController();