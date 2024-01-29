import {configEvents, configVariables} from "@/config";
import {apiRoutes} from "@/shared/apiRouter/apiRoutes";
import {Config, Endpoints, GetConfigSuccessResponse} from "@calculator/common";
import {BaseController} from "@/shared/helpers/controller/BaseController";

class ConfigController extends BaseController<Config | undefined> {
    constructor() {
        super(configVariables);
    }
    setupEventsSubscriptions() {
        const fetcher = apiRoutes[Endpoints.CONFIG].get.fetch;
        configEvents.onFetchConfig.subscribe(
            this.createAsyncEventHandler<GetConfigSuccessResponse>(fetcher, {
                transformAfter(valueBefore) {
                    return valueBefore.data;
                }
            })
        );
    }
}

export const configController = new ConfigController();