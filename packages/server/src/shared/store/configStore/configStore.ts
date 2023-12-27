import {ProcessedConfig} from "../../../components/calculate/domain/CalculatorService/types/types";
import {createStore} from "../helpers/createStore";
import {processConfig} from "../../../components/calculate/domain/CalculatorService/utils/processConfig/processConfig";
import UserConfigAccessor from "../../../components/configuration/domain/UserConfigAccessor";
import {DigitSymbols, Symbols} from "@calculator/common";
import {RegexMap} from "../../../components/calculate/domain/CalculatorService/constants/regexMap";

interface InitialStoreInterface {
    processedConfig: ProcessedConfig;
    symbols: Symbols;
    digitSymbols: DigitSymbols;
}


const { operations, symbols, digitSymbols }
    = UserConfigAccessor.getUserConfig();

new RegexMap(symbols);

export const configStore = createStore<InitialStoreInterface>({
    processedConfig: processConfig(operations),
    symbols,
    digitSymbols
});

