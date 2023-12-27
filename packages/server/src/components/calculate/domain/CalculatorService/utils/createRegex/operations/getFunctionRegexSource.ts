import {
    getFunctionOperationSignsRegexSource
} from "./getFunctionOperationSignsRegexSource";
import {Regex} from "../../../constants/regex";
import {OperationList} from "@calculator/common";

export function getFunctionRegexSource(operationsList: OperationList) {
    const {prefixFunctionNames, postfixFunctionNames} = getFunctionOperationSignsRegexSource(operationsList);

    const prefixDeclaration = `${prefixFunctionNames}${Regex.NESTING_WITHOUT_PARENTHESES.source}`;
    const postfixDeclaration = `${Regex.NESTING_WITHOUT_PARENTHESES.source}${postfixFunctionNames}`;

    return `(${prefixDeclaration})|(${postfixDeclaration})`;
}