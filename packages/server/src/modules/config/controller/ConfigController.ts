import {RestRequestBody, RestResponse} from "@/shared/types/express";
import {GetConfigPayload, Config} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {configAccessor} from "@/config/domain/ConfigAccessor";


class ConfigController {
    async getUserConfig(
        _req: RestRequestBody<GetConfigPayload>,
        res: RestResponse<Config>,
        next: NextFunction
    ): Promise<void> {
        try{
            const userConfig = configAccessor.getUserConfig();
            sendSuccessResponse(res, userConfig);
        } catch (error) {
            next(handleUnknownError(error));
        }
    }
}

export const configController = new ConfigController();