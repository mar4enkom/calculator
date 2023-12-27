import {
    getFunctionOperationSignsRegexSource
} from "./getFunctionOperationSignsRegexSource";
import {RegexMap} from "../../../constants/regexMap";
import {OperationList} from "@calculator/common";

export function getFunctionRegexSource(operationsList: OperationList) {
    const {prefixFunctionNames, postfixFunctionNames} = getFunctionOperationSignsRegexSource(operationsList);

    const prefixDeclaration = `${prefixFunctionNames}${RegexMap.NESTING_WITHOUT_PARENTHESES.source}`;
    const postfixDeclaration = `${RegexMap.NESTING_WITHOUT_PARENTHESES.source}${postfixFunctionNames}`;

    return `(${prefixDeclaration})|(${postfixDeclaration})`;
}