import {DigitSymbols, OperationsConfig, Symbols} from "@calculator/common";

export interface UserConfigDataService {
    getOperationsConfig(): OperationsConfig;
    getSymbols(): Symbols;
    getDigitSymbols(): DigitSymbols;
}
