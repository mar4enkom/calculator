import {ProcessedConfig} from "../../../components/calculate/domain/CalculatorService/types/types";
import {createStore} from "../helpers/createStore";
import {processConfig} from "../../../components/calculate/domain/CalculatorService/utils/processConfig/processConfig";
import {DigitSymbols, Symbols} from "@calculator/common";
import {RegexMap} from "../../../components/calculate/domain/CalculatorService/constants/regexMap";
import {configAccessor} from "@/config/domain/ConfigAccessor";

interface InitialStoreInterface {
    processedConfig: ProcessedConfig;
    symbols: Symbols;
    digitSymbols: DigitSymbols;
}


const { operations, symbols, digitSymbols }
    = configAccessor.getUserConfig();

new RegexMap(symbols);

export const configStore = createStore<InitialStoreInterface>({
    processedConfig: processConfig(operations),
    symbols,
    digitSymbols
});

