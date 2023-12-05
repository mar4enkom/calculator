import {getFunctionOperationSignsRegexSource} from "CalculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource.js";
import {Regex} from "CalculatorService/constants/regex.js";

export function getFunctionRegexSource(operationsList) {
    const {prefixFunctionNames, postfixFunctionNames} = getFunctionOperationSignsRegexSource(operationsList);

    const prefixDeclaration = `${prefixFunctionNames}${Regex.NESTING_WITHOUT_PARENTHESES.source}`;
    const postfixDeclaration = `${Regex.NESTING_WITHOUT_PARENTHESES.source}${postfixFunctionNames}`;

    return `(${prefixDeclaration})|(${postfixDeclaration})`;
}