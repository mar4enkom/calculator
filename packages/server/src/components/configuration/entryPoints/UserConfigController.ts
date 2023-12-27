import {RestRequestBody, RestResponse} from "../../../shared/types/express";
import {NextFunction} from "express";
import {UserConfigPayload, UserConfigResponseBody} from "@calculator/common";
import {handleUnknownError} from "../../../shared/utils/handleUnknownError";
import {sendSuccessResponse} from "../../../shared/utils/sendResponse";
import UserConfigAccessor from "../domain/UserConfigAccessor";

class UserConfigController {
    async getUserConfig(
        _req: RestRequestBody<UserConfigPayload>,
        res: RestResponse<UserConfigResponseBody>,
        _next: NextFunction
    ): Promise<void> {
        try{
            const userConfig = UserConfigAccessor.getUserConfig();
            sendSuccessResponse(res, userConfig);
        } catch (error) {
            handleUnknownError(error);
        }
    }
}

export default new UserConfigController();