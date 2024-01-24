import {Config} from "@calculator/common";
import {UserConfigDataService as UserConfigDataServiceInterface} from "@/config/dataAccess/types";
import {configDataService} from "@/config/dataAccess/ConfigDataService";

class ConfigAccessor {
    private dataService: UserConfigDataServiceInterface;
    constructor(dataService: UserConfigDataServiceInterface) {
        this.dataService = dataService;

        this.getUserConfig = this.getUserConfig.bind(this);
    }

    getUserConfig(): Config {
        return {
            operations: this.dataService.getOperationsConfig(),
            symbols: this.dataService.getSymbols(),
            digitSymbols: this.dataService.getDigitSymbols()
        }
    }
}

export const configAccessor = new ConfigAccessor(configDataService);
