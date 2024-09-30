import {GetConfigPayload, Config, Endpoints} from "@calculator/common";
import {configAccessor} from "@/config/domain/ConfigAccessor";
import {createExpressAction} from "@/shared/utils/expressAction";
import {ExpressController} from "@/shared/types/controller";

const configController: ExpressController<Endpoints.CONFIG> = {
    get: createExpressAction<Config, GetConfigPayload>(configAccessor.getUserConfig)
};

export default {
    [Endpoints.CONFIG]: configController
};