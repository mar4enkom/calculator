import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {UserConfigPayload, UserConfigResponseBody} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {userConfigAccessor} from "@/configuration/domain/UserConfigAccessor";


class UserConfigController {
    async getUserConfig(
        _req: RestRequestBody<UserConfigPayload>,
        res: RestResponse<UserConfigResponseBody>,
        next: NextFunction
    ): Promise<void> {
        try{
            const userConfig = userConfigAccessor.getUserConfig();
            sendSuccessResponse(res, userConfig);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const userConfigController = new UserConfigController();