import {UserConfigResponseBody} from "@calculator/common";
import {UserConfigDataService as UserConfigDataServiceInterface} from "@/configuration/dataAccess/types";
import {userConfigDataService} from "@/configuration/dataAccess/UserConfigDataService";

class UserConfigAccessor {
    private dataService: UserConfigDataServiceInterface;
    constructor(dataService: UserConfigDataServiceInterface) {
        this.dataService = dataService;
    }

    getUserConfig(): UserConfigResponseBody {
        return {
            operations: this.dataService.getOperationsConfig(),
            symbols: this.dataService.getSymbols(),
            digitSymbols: this.dataService.getDigitSymbols()
        }
    }
}

export const userConfigAccessor = new UserConfigAccessor(userConfigDataService);
