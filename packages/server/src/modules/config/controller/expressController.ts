import {GetConfigPayload, Config, Endpoints} from "@calculator/common";
import {configAccessor} from "@/config/domain/ConfigAccessor";
import {createExpressAction} from "@/shared/utils/expressAction";
import {BaseExpressController} from "@/shared/types/controller";

type ConfigController = BaseExpressController<Config, GetConfigPayload, Config>;

const configController: ConfigController = {
    get: createExpressAction(configAccessor.getUserConfig)
};

export default {
    [Endpoints.CONFIG]: configController
};