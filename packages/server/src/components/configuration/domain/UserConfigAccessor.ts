import {UserConfigResponseBody} from "@calculator/common";
import UserConfigDataService  from "@/configuration/dataAccess/UserConfigDataService";
import {UserConfigDataService as UserConfigDataServiceInterface} from "@/configuration/dataAccess/types";

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

export default new UserConfigAccessor(UserConfigDataService);
