import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {beforeRequest} from "@/shared/utils/beforeRequest";
import {configEvents, configVariables} from "@/config";
import {configApiService} from "@/config/api/ConfigApiService/ConfigApiService";

class ConfigController {
    setupEventsSubscriptions() {
        configEvents.onFetchConfig.subscribe(this.handleFetchConfig.bind(this));
    }

    private async handleFetchConfig(): Promise<void> {
        try {
            beforeRequest(configVariables);
            const result = await configApiService.getConfig();
            configVariables.value.setValue(result);
        } catch (e) {
            const error = handleUnknownError(e);
            configVariables.error.setValue(error)
        } finally {
            configVariables.loading.setValue(false);
        }
    }
}

export const configController = new ConfigController();