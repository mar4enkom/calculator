import {OperationByPriority, Operations} from "../../../../../userConfig/operations/constants.js";
import {Regex} from "../../../../constants/regex.js";
import {Symbols} from "../../../../constants/constants.js";
import {stringIsNumber} from "../../../../utils/stringIsNumber.js";
import {ValidateConfigOperation} from "./ValidateConfigOperation.js";

export class ConfigInitializer {
    static instance;
    operationValidator;

    static getInstance() {
        if(!ConfigInitializer.instance) {
            ConfigInitializer.instance = new ConfigInitializer();
        }
        return ConfigInitializer.instance;
    }

    constructor() {
        this.operationValidator = ValidateConfigOperation.getInstance();
    }

    init(initialConfig) {
        if(!initialConfig) throw new Error("No config was passed");
        return Object.entries(initialConfig).reduce((acc, operation) => ({
            ...acc,
            ...this.#getOperationObject(...operation)
        }), {})
    }

    #getOperationObject(operationCategory, operationsList) {
        const newOperationsObj = operationsList.reduce((acc, props) => (
            {...acc, [props.sign]: this.operationValidator.withValidatedCalc(props)}
        ), {});

        const extractOperationBody = this.#getExtractOperationBodyFunc(newOperationsObj, operationCategory);
        const extractOperationSign = this.#getExtractOperationSignFunc(newOperationsObj, operationCategory);
        const extractOperands = this.#getExtractOperandsFunc(operationCategory);

        return {
            [operationCategory]: {
                priority: OperationByPriority[operationCategory],
                operations: newOperationsObj,
                extractOperationBody,
                extractOperationSign,
                extractOperands,
            }
        }
    }

    #getExtractOperationBodyFunc (operationsObj, operationCategory) {
        return (expression) => {
            const operationSignRegexSource = this.#getOperationsSignRangeRegex(operationsObj).source;

            let operationRegexSource;
            switch (operationCategory) {
                case Operations.CONSTANT:
                    operationRegexSource = `${operationSignRegexSource}`;
                    break;
                case Operations.SIGN:
                    operationRegexSource = `${Regex.NUMBER.source}${operationSignRegexSource}`;
                    break;
                case Operations.OPERATOR_LOW_PRIORITY:
                case Operations.OPERATOR_HIGH_PRIORITY:
                    operationRegexSource = `${Regex.NUMBER.source}${operationSignRegexSource}${Regex.NUMBER.source}`;
                    break;
                case Operations.FUNCTION:
                    operationRegexSource = `${operationSignRegexSource}${Regex.NESTING_WITHOUT_PARENTHESES.source}`;
                    break;
                default:
                    throw new Error(`No operation category ${operationCategory}`);
            }

            const operationRegex = new RegExp(operationRegexSource);
            return operationRegex.exec(expression)?.[0];
        }
    }

    #getExtractOperationSignFunc(operationsObj, operationCategory) {
        return (expression) => {
            const operationsRangeSignRegexSource = this.#getOperationsSignRangeRegex(operationsObj).source;

            let operationSignRegexSource;
            switch (operationCategory) {
                case Operations.CONSTANT:
                case Operations.FUNCTION:
                case Operations.SIGN:
                    operationSignRegexSource = operationsRangeSignRegexSource;
                    break;
                case Operations.OPERATOR_LOW_PRIORITY:
                case Operations.OPERATOR_HIGH_PRIORITY:
                    operationSignRegexSource = `(?<=\\d)${operationsRangeSignRegexSource}(?=${Regex.NUMBER.source})`;
                    break;
                default:
                    throw new Error(`No operation category ${operationCategory}`);
            }

            const operationSignRegex = new RegExp(operationSignRegexSource);
            return operationSignRegex.exec(expression)?.[0];
        }
    }

    #getExtractOperandsFunc(operationCategory) {
        let extractOperandsFunc;
        switch (operationCategory) {
            case Operations.CONSTANT:
                extractOperandsFunc = (sign, expression) => [sign];
                break;
            case Operations.SIGN:
                extractOperandsFunc = (sign, expression) => [expression.slice(0, expression.indexOf(sign))]
                break;
            case Operations.OPERATOR_LOW_PRIORITY:
            case Operations.OPERATOR_HIGH_PRIORITY:
                extractOperandsFunc = (sign, expression) => expression.split(sign);
                break;
            case Operations.FUNCTION:
                extractOperandsFunc = (sign, expression) => {
                    const argsStr = expression.slice(expression.indexOf(Symbols.LP)+1, expression.indexOf(Symbols.RP));
                    return argsStr.split(Symbols.COMMA);
                }
                break;
            default:
                throw new Error(`No operation category ${operationCategory}`);
        }

        return extractOperandsFunc;
    }

    #getOperationsSignRangeRegex = (operationsObj) => {
        const signSymbols = Object.keys(operationsObj);
        const signSymbolsRegexStr = signSymbols
            .map(s => Regex.REGEX_RESERVED_SYMBOL.test(s) ? `\\${s}` : s)
            .join('|');
        return new RegExp(`(${signSymbolsRegexStr})`);
    }
}