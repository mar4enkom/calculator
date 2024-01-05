import {handleUnknownError} from "../../shared/utils/handleUnknownError";
import {UserConfigVariables} from "../observer/types";
import {UserConfigApiService} from "../api/types";

export class UserConfigController {
    private variables: UserConfigVariables;
    private apiService: UserConfigApiService;
    constructor(variables: UserConfigVariables, userConfigFetcher: UserConfigApiService) {
        this.variables = variables;
        this.apiService = userConfigFetcher;

        this.handleFetchUserConfig = this.handleFetchUserConfig.bind(this);
    }

    async handleFetchUserConfig(): Promise<void> {
        try {
            this.variables.loading.setValue(true);
            const result = await this.apiService.getConfig();
            this.variables.value.setValue(result);
        } catch (e) {
            console.log(e);
            const error = handleUnknownError(e);
            this.variables.error.setValue(error)
        } finally {
            this.variables.loading.setValue(false);
        }
    }
}