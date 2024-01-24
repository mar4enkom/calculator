import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {beforeRequest} from "@/shared/utils/beforeRequest";
import {configEvents, configVariables} from "@/config";
import {apiRouter} from "@/shared/apiRouter/apiRouter";
import {Endpoints, GetConfigSuccessResponse} from "@calculator/common";

class ConfigController {
    setupEventsSubscriptions() {
        configEvents.onFetchConfig.subscribe(this.handleFetchConfig.bind(this));
    }

    private async handleFetchConfig(): Promise<void> {
        try {
            beforeRequest(configVariables);
            const result = await apiRouter[Endpoints.CONFIG_GET].fetch<GetConfigSuccessResponse>();
            configVariables.value.setValue(result.data);
        } catch (e) {
            const error = handleUnknownError(e);
            configVariables.error.setValue(error)
        } finally {
            configVariables.loading.setValue(false);
        }
    }
}

export const configController = new ConfigController();