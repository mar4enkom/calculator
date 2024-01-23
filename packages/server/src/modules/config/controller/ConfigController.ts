import {ExpressParams, RestRequestBody, RestResponse} from "@/shared/types/express";
import {GetConfigPayload, Config} from "@calculator/common";
import {NextFunction} from "express";
import {sendSuccessResponse} from "@/shared/utils/sendResponse";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {configAccessor} from "@/config/domain/ConfigAccessor";
import {BaseExpressController} from "@/shared/helpers/controller/BaseExpressController";


class ConfigController extends BaseExpressController {
    async getUserConfig(...params: ExpressParams<GetConfigPayload, Config>): Promise<void> {
        this.handleRequest(...params, () => configAccessor.getUserConfig());
    }
}

export const configController = new ConfigController();