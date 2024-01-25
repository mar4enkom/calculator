import {GetConfigPayload, Config, Endpoints} from "@calculator/common";
import {configAccessor} from "@/config/domain/ConfigAccessor";
import {createExpressCallback} from "@/shared/helpers/controller/BaseExpressController";

const configController = {
    [Endpoints.CONFIG_GET]: createExpressCallback<Config, GetConfigPayload>(configAccessor.getUserConfig)
};

export default configController;