import {GetConfigPayload, Config, Endpoints} from "@calculator/common";
import {configAccessor} from "@/config/domain/ConfigAccessor";
import {createExpressAction} from "@/shared/helpers/controller/BaseExpressController";

const configController = {
    [Endpoints.CONFIG_GET]: createExpressAction<Config, GetConfigPayload>(configAccessor.getUserConfig)
};

export default configController;