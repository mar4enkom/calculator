import {UserConfigEvents, UserConfigVariables} from "@/userConfig";
import {UserConfigApiService} from "@/userConfig/api/types";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";

export class UserConfigController {
    private variables: UserConfigVariables;
    private apiService: UserConfigApiService;
    private events: UserConfigEvents;
    constructor(variables: UserConfigVariables, events: UserConfigEvents, userConfigFetcher: UserConfigApiService) {
        this.variables = variables;
        this.apiService = userConfigFetcher;
        this.events = events;
    }

    setupEventsSubscriptions() {
        this.events.onFetchUserConfig.subscribe(this.handleFetchUserConfig.bind(this));
    }

    private async handleFetchUserConfig(): Promise<void> {
        try {
            this.variables.loading.setValue(true);
            const result = await this.apiService.getConfig();
            this.variables.value.setValue(result);
        } catch (e) {
            const error = handleUnknownError(e);
            this.variables.error.setValue(error)
        } finally {
            this.variables.loading.setValue(false);
        }
    }
}