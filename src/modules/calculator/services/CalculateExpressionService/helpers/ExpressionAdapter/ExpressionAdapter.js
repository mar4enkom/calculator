import {createMemoRegex} from "../../utils/createMemoRegex.js";
import {getOptionalParenthesesRegex} from "../../utils/createRegex/getOptionalParenthesesRegex.js";
import {getPrefixFunctionNamesRegex} from "../../utils/createRegex/getPrefixFunctionNamesRegex.js";
import {getFirstMatch} from "../../../../shared/utils/regexUtils/getFirstMatch.js";
import {Regex} from "../../constants/regex.js";
import {parenthesize} from "../../utils/parenthesize.js";
import {compose} from "../../../../shared/utils/composeFunctions.js";

export class ExpressionAdapter {
    static adaptExpression(expression, operationQueue) {
        const adaptExpression = compose(ExpressionAdapter.#functionOptionalParenthesesAdapter);

        return adaptExpression(expression, operationQueue);
    }

    static #functionOptionalParenthesesAdapter(expression, operationQueue) {
        const optionalParenthesesRegex = createMemoRegex(getOptionalParenthesesRegex(operationQueue));
        const prefixFunctionNamesRegex = createMemoRegex(getPrefixFunctionNamesRegex(operationQueue));

        let currentExpression = expression;

        while(true) {
            const matchedExpr = getFirstMatch(optionalParenthesesRegex, currentExpression);
            if(matchedExpr == null) return currentExpression;

            const operand = getFirstMatch(Regex.FLOAT_NUMBER, matchedExpr);
            const operationSign = matchedExpr.replace(operand, "");

            let updatedExpr;
            if(getFirstMatch(prefixFunctionNamesRegex, matchedExpr) != null) {
                updatedExpr = operationSign.concat(parenthesize(operand));
            } else {
                updatedExpr = parenthesize(operand).concat(operationSign);
            }
            currentExpression = currentExpression.replace(matchedExpr, updatedExpr);
        }

        return currentExpression;
    }
}