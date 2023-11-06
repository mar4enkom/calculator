import {safeRegexSymbol} from "../../../../utils/safetyRegexSymbol.js";
import {Regex} from "../../../../constants/regex.js";

function getOperationSignsRegexSourceBySignsList(signs) {
    const signSymbolsRegexStr = signs
        .map(s => safeRegexSymbol(s))
        .join('|');
    return `(${signSymbolsRegexStr})`;
}

export function getOperationSignsRegexSource(operationsList) {
    const signSymbols = operationsList.map(el => el.sign);
    return getOperationSignsRegexSourceBySignsList(signSymbols);
}

export function getFunctionOperationSignsRegexSource(operationsList) {
    const postfixFunctionNames = operationsList
        .filter(op => op.postfixForm === true)
        .map(op => op.sign);
    const prefixFunctionNames = operationsList
        .filter(op => !op.postfixForm)
        .map(op => op.sign);

    return {
        prefixFunction: getOperationSignsRegexSourceBySignsList(prefixFunctionNames),
        postfixFunction: getOperationSignsRegexSourceBySignsList(postfixFunctionNames),
    }
}

export function getFunctionRegexSource(operationsList) {
    const { prefixFunction, postfixFunction } = getFunctionOperationSignsRegexSource(operationsList);

    const prefixDeclaration = `${prefixFunction}${Regex.NESTING_WITHOUT_PARENTHESES.source}`;
    const postfixDeclaration = `${Regex.NESTING_WITHOUT_PARENTHESES.source}${postfixFunction}`;

    return `(${prefixDeclaration})|(${postfixDeclaration})`;
}