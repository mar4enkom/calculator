import {UserConfigEvents, UserConfigVariables} from "@/userConfig";
import {UserConfigApiService} from "@/userConfig/api/types";
import {handleUnknownError} from "@/shared/utils/handleUnknownError";

export class UserConfigController {
    private userConfigVariables: UserConfigVariables;
    private userConfigFetcher: UserConfigApiService;
    private userConfigEvents: UserConfigEvents;
    constructor(variables: UserConfigVariables, events: UserConfigEvents, userConfigFetcher: UserConfigApiService) {
        this.userConfigVariables = variables;
        this.userConfigFetcher = userConfigFetcher;
        this.userConfigEvents = events;
    }

    setupEventsSubscriptions() {
        this.userConfigEvents.onFetchUserConfig.subscribe(this.handleFetchUserConfig.bind(this));
    }

    private async handleFetchUserConfig(): Promise<void> {
        try {
            this.userConfigVariables.loading.setValue(true);
            const result = await this.userConfigFetcher.getConfig();
            this.userConfigVariables.value.setValue(result);
        } catch (e) {
            const error = handleUnknownError(e);
            this.userConfigVariables.error.setValue(error)
        } finally {
            this.userConfigVariables.loading.setValue(false);
        }
    }
}