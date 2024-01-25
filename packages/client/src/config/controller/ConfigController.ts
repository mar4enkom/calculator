import {configEvents, configVariables} from "@/config";
import {apiRoutes} from "@/shared/apiRouter/apiRoutes";
import {Config, Endpoints, GetConfigSuccessResponse, GetConfigPayload} from "@calculator/common";
import {BaseController} from "@/shared/helpers/controller/BaseController";

class ConfigController extends BaseController<Config | undefined> {
    constructor() {
        super(configVariables);
    }
    setupEventsSubscriptions() {
        configEvents.onFetchConfig.subscribe(this.handleFetchConfig.bind(this));
    }

    private async handleFetchConfig(): Promise<void> {
        const fetcher = apiRoutes[Endpoints.CONFIG_GET].fetch;
        this.handleAsyncEvent<GetConfigPayload, GetConfigSuccessResponse>(fetcher, undefined, {
            transformAfter(valueBefore) {
                return valueBefore.data;
            }
        });
    }
}

export const configController = new ConfigController();