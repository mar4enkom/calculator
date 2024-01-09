import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {UserConfigPayload, UserConfigResponseBody} from "@calculator/common";
import {NextFunction} from "express";
import UserConfigAccessor from "@/configuration/domain/UserConfigAccessor";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";


class UserConfigController {
    async getUserConfig(
        _req: RestRequestBody<UserConfigPayload>,
        res: RestResponse<UserConfigResponseBody>,
        next: NextFunction
    ): Promise<void> {
        try{
            const userConfig = UserConfigAccessor.getUserConfig();
            sendSuccessResponse(res, userConfig);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export default new UserConfigController();