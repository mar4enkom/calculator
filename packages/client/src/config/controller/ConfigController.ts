import {configEvents, configVariables} from "@/config";
import {apiRoutes} from "@/shared/apiRouter/apiRoutes";
import {Endpoints, GetConfigSuccessResponse} from "@calculator/common";
import {handleError} from "@/shared/utils/handleError";

class ConfigController {
    setupEventsSubscriptions() {
        configEvents.onFetchConfig.subscribe(this.handleFetchConfig.bind(this));
    }

    private async handleFetchConfig() {
        try {
            const getConfig = apiRoutes[Endpoints.CONFIG].get.fetch<GetConfigSuccessResponse>;
            const response = await getConfig();
            configVariables.value.setValue(response.data);
        } catch (error) {
            handleError(error, configVariables.error);
        } finally {
            configVariables.loading.setValue(false);
        }
    }
}

export const configController = new ConfigController();