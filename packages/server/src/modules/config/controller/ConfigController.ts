import {ExpressParams} from "@/shared/types/express";
import {GetConfigPayload, Config} from "@calculator/common";
import {configAccessor} from "@/config/domain/ConfigAccessor";
import {handleExpressRequest} from "@/shared/helpers/controller/BaseExpressController";

class ConfigController {
    constructor() {
        this.getUserConfig = this.getUserConfig.bind(this);
    }
    async getUserConfig(...params: ExpressParams<GetConfigPayload, Config>): Promise<void> {
        handleExpressRequest<Config, GetConfigPayload>(...params, configAccessor.getUserConfig);
    }
}

export const configController = new ConfigController();