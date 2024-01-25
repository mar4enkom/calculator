import {GetConfigPayload, Config} from "@calculator/common";
import {configAccessor} from "@/config/domain/ConfigAccessor";
import {createExpressCallback} from "@/shared/helpers/controller/BaseExpressController";

export const configController = {
    getUserConfig: createExpressCallback<Config, GetConfigPayload>(configAccessor.getUserConfig)
};