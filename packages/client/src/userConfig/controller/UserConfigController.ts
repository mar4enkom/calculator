import {handleUnknownError} from "../../shared/utils/handleUnknownError";
import {UserConfigFetcher} from "../domain/UserConfigFetcher/UserConfigFetcher";
import {UserConfigVariables} from "../types";

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
            this.variables.loading.setValue(true);
            const result = await this.userConfigFetcher.getUserConfig();
            this.variables.value.setValue(result);
        } catch (e) {
            const error = handleUnknownError(e);
            this.variables.error.setValue(error)
        } finally {
            this.variables.loading.setValue(false);
        }
    }
}