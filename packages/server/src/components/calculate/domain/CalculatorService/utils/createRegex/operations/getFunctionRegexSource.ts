
import {OperationList} from "@calculator/common";
import {
    getFunctionOperationSignsRegexSource
} from "@/calculate/domain/CalculatorService/utils/createRegex/operations/getFunctionOperationSignsRegexSource";
import {RegexMap} from "@/calculate/domain/CalculatorService/constants/regexMap";

export function getFunctionRegexSource(operationsList: OperationList) {
    const {prefixFunctionNames, postfixFunctionNames} = getFunctionOperationSignsRegexSource(operationsList);

    const prefixDeclaration = `${prefixFunctionNames}${RegexMap.NESTING_WITHOUT_PARENTHESES.source}`;
    const postfixDeclaration = `${RegexMap.NESTING_WITHOUT_PARENTHESES.source}${postfixFunctionNames}`;

    return `(${prefixDeclaration})|(${postfixDeclaration})`;
}