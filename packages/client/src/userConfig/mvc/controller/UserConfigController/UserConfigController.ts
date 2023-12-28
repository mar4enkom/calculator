import {UserConfigModel} from "../../model/UserConfigModel";
import {Events} from "../../events";
import {UserConfigFetcher} from "../../../domain/types";

// TODO: add aliases
export class UserConfigController {
    private model: UserConfigModel;
    private userConfigFetcher: UserConfigFetcher;
    constructor(model: UserConfigModel, userConfigAccessor: UserConfigFetcher) {
        this.model = model;
        this.userConfigFetcher = userConfigAccessor;

        this.model.subscribe(Events.FETCH_USER_CONFIG, this.handleFetchUserConfig.bind(this));
    }

    async handleFetchUserConfig(): Promise<void> {
        // TODO: TestDigitSymbols -> digit symbols from server
        const fetchResult =
            await this.userConfigFetcher.getUserConfig();

        if(fetchResult?.errors != null) {
            this.model.setErrors(fetchResult.errors);
        } else if(fetchResult?.data) {
            this.model.setUserConfig(fetchResult.data);
        }
    }
}
