import {operationsConfig} from "./data";
import {UserConfigDataService as UserConfigDataServiceInterface} from "./types";
import {Digits, Symbols} from "./data/constants";


class ConfigDataService implements UserConfigDataServiceInterface {
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

export const configDataService = new ConfigDataService();