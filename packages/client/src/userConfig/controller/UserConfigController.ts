import {handleUnknownError} from "../../shared/utils/handleUnknownError";
import {UserConfigFetcher} from "../userConfig/UserConfigFetcher/UserConfigFetcher";
import {UserConfigVariables} from "../observer/types";

export class UserConfigController {
    private variables: UserConfigVariables;
    private userConfigFetcher: UserConfigFetcher;
    constructor(variables: UserConfigVariables, userConfigFetcher: UserConfigFetcher) {
        this.variables = variables;
        this.userConfigFetcher = userConfigFetcher;

        this.fetchUserConfigController = this.fetchUserConfigController.bind(this);
    }

    async fetchUserConfigController(): Promise<void> {
        try {
            this.variables.userConfigLoading.setValue(true);
            const result = await this.userConfigFetcher.getUserConfig();
            this.variables.userConfigValue.setValue(result);
        } catch (e) {
            const error = handleUnknownError(e);
            this.variables.userConfigError.setValue(error)
        } finally {
            this.variables.userConfigLoading.setValue(false);
        }
    }
}