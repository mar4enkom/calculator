import {operationsConfig} from "./data";
import {UserConfigDataService as UserConfigDataServiceInterface} from "./types";
import {Digits, Symbols} from "./data/constants";
import {OperationsConfig} from "@calculator/common";


class UserConfigDataService implements UserConfigDataServiceInterface {
    getOperationsConfig() {
        return operationsConfig;
    }

    getSymbols() {
        return Symbols;
    }

    getDigitSymbols() {
        return Digits;
    }
}

export default new UserConfigDataService();