import {ExpressParams} from "@/shared/types/express";
import {GetConfigPayload, Config} from "@calculator/common";
import {configAccessor} from "@/config/domain/ConfigAccessor";
import {BaseExpressController} from "@/shared/helpers/controller/BaseExpressController";


class ConfigController extends BaseExpressController {
    constructor() {
        super();
        this.getUserConfig = this.getUserConfig.bind(this);
    }
    async getUserConfig(...params: ExpressParams<GetConfigPayload, Config>): Promise<void> {
        this.handleRequest(...params, () => configAccessor.getUserConfig());
    }
}

export const configController = new ConfigController();