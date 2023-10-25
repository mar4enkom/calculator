import {OperationByPriority, Operations} from "../constants.js";
import {Regex} from "../../../constants/regex.js";
import {Symbols} from "../../../constants/constants.js";
import {signs} from "../configs/signsConfig.js";

const operatorExtractor = (sign, expression) => {
    return expression.split(sign);
};

const OperationArgsExtractors = {
    [Operations.CONSTANT]: (sign, expression) => [sign],
    [Operations.SIGN]: (sign, expression) => [expression.slice(0, expression.indexOf(sign))],
    [Operations.OPERATOR_LOW_PRIORITY]: operatorExtractor,
    [Operations.OPERATOR_HIGH_PRIORITY]: operatorExtractor,
    [Operations.FUNCTION]: (sign, expression) => {
        const argsStr = expression.slice(expression.indexOf(Symbols.LP)+1, expression.indexOf(Symbols.RP));
        return argsStr.split(Symbols.COMMA);
    }
}

const getOperationsSignRangeRegex = (operationsObj) => {
    const signSymbols = Object.keys(operationsObj);
    const signSymbolsRegexStr = signSymbols
        .map(s => Regex.REGEX_RESERVED_SYMBOL.test(s) ? `\\${s}` : s)
        .join('|');
    return new RegExp(`(${signSymbolsRegexStr})`);
}

const getExtractOperationSignFunc = (operationsObj, operationCategory) => (expression) => {
    const getOperatorSignRegexSource = (regexSource) =>
        `(?<=\\d)${regexSource}(?=${Regex.NUMBER.source})`

    const getOperationSignRegex = (operationSignRegexSource) => ({
        [Operations.CONSTANT]: `${operationSignRegexSource}`,
        [Operations.SIGN]: `${operationSignRegexSource}`,
        [Operations.OPERATOR_LOW_PRIORITY]: getOperatorSignRegexSource(operationSignRegexSource),
        [Operations.OPERATOR_HIGH_PRIORITY]: getOperatorSignRegexSource(operationSignRegexSource),
        [Operations.FUNCTION]: `${operationSignRegexSource}`
    });

    const operationsRangeSignRegexSource = getOperationsSignRangeRegex(operationsObj).source;
    const operationSignRegexSource = getOperationSignRegex(operationsRangeSignRegexSource)[operationCategory];
    const operationSignRegex = new RegExp(operationSignRegexSource);
    return operationSignRegex.exec(expression)?.[0];
}

const getExtractOperationBodyFunc = (operationsObj, operationCategory) => (expression) => {
    const getOperatorRegexSource = (regexSource) =>
        `${Regex.NUMBER.source}${regexSource}${Regex.NUMBER.source}`

    const getOperationRegexSource = (operationSignRegexSource) => ({
        [Operations.CONSTANT]: `${operationSignRegexSource}`,
        [Operations.SIGN]: `${Regex.NUMBER.source}${operationSignRegexSource}`,
        [Operations.OPERATOR_LOW_PRIORITY]: getOperatorRegexSource(operationSignRegexSource),
        [Operations.OPERATOR_HIGH_PRIORITY]: getOperatorRegexSource(operationSignRegexSource),
        [Operations.FUNCTION]: `${operationSignRegexSource}${Regex.MOST_NESTED_PARENTHESES.source}`
    });

    const operationSignRegex = getOperationsSignRangeRegex(operationsObj);
    const operationRegexSource = getOperationRegexSource(operationSignRegex.source)[operationCategory];

    const operationRegex = new RegExp(operationRegexSource);

    return operationRegex.exec(expression)?.[0];
}

export function getOperationObject(operationsList, operationCategory) {
    const newOperationsObj = operationsList.reduce((acc, props) => {
        return { ...acc, [props.sign]: props};
    }, {});

    const extractOperationBody = getExtractOperationBodyFunc(newOperationsObj, operationCategory);
    const extractOperationSign = getExtractOperationSignFunc(newOperationsObj, operationCategory);
    const extractOperands = OperationArgsExtractors[operationCategory];

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

