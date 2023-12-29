import {UserConfigModel} from "../../model/UserConfigModel";
import {UserConfigEvents} from "../../userConfigEvents";
import {UserConfigFetcher} from "../../../domain/types";

// TODO: add aliases
export class UserConfigController {
    private model: UserConfigModel;
    private userConfigFetcher: UserConfigFetcher;
    constructor(model: UserConfigModel, userConfigAccessor: UserConfigFetcher) {
        this.model = model;
        this.userConfigFetcher = userConfigAccessor;

        this.model.subscribe(UserConfigEvents.FETCH_USER_CONFIG, this.handleFetchUserConfig.bind(this));
    }

    async handleFetchUserConfig(): Promise<void> {
        // TODO: TestDigitSymbols -> digit symbols from server
        this.model.setIsLoading(true);
        const fetchResult =
            await this.userConfigFetcher.getUserConfig();
        this.model.setIsLoading(false);

        if(fetchResult?.errors != null) {
            this.model.setErrors(fetchResult.errors);
        } else if(fetchResult?.data) {
            this.model.setUserConfig(fetchResult.data);
        }
        this.model.notify(UserConfigEvents.LOADING_UPDATED, false);
    }
}
