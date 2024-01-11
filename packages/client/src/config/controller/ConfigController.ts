import {ConfigEvents, ConfigVariables} from "src/config";
import {ConfigApiService} from "@/config/api/types";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";
import {beforeRequest} from "@/shared/utils/beforeRequest";

export class ConfigController {
    private configVariables: ConfigVariables;
    private configFetcher: ConfigApiService;
    private configEvents: ConfigEvents;
    constructor(variables: ConfigVariables, events: ConfigEvents, configFetcher: ConfigApiService) {
        this.configVariables = variables;
        this.configFetcher = configFetcher;
        this.configEvents = events;
    }

    setupEventsSubscriptions() {
        this.configEvents.onFetchConfig.subscribe(this.handleFetchConfig.bind(this));
    }

    private async handleFetchConfig(): Promise<void> {
        try {
            beforeRequest(this.configVariables);
            const result = await this.configFetcher.getConfig();
            this.configVariables.value.setValue(result);
        } catch (e) {
            const error = handleUnknownError(e);
            this.configVariables.error.setValue(error)
        } finally {
            this.configVariables.loading.setValue(false);
        }
    }
}