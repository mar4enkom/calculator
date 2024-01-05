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
            this.variables.userConfigLoading.setValue(true);
            const result = await this.apiService.getConfig();
            this.variables.userConfigValue.setValue(result);
        } catch (e) {
            console.log(e);
            const error = handleUnknownError(e);
            this.variables.userConfigError.setValue(error)
        } finally {
            this.variables.userConfigLoading.setValue(false);
        }
    }
}