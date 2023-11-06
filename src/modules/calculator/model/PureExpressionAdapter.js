import {Operations} from "../../../constants/operations.js";
import {safeRegexSymbol} from "../../../utils/safetyRegexSymbol.js";
import {Regex} from "../../../constants/regex.js";
import {Symbols} from "../../../constants/constants.js";
import {
    getFunctionOperationSignsRegexSource,
    getOperationSignsRegexSource
} from "./utils/getOperationSignsRegexSource.js";
import {compose} from "../../../utils/composeFunctions.js";
import {logPlugin} from "@babel/preset-env/lib/debug.js";

export class PureExpressionAdapter {
    constructor(operationQueue) {
        this.operationQueue = operationQueue;

        this.optionalParenthesesRegex = this.#getOptionalParenthesesRegex();
        this.prefixFunctionNamesRegex = this.#getPrefixFunctionNamesRegex();
    }

    apply(expression) {
        const adaptPureExpression = compose(
            this.#functionOptionalParenthesesDecorator.bind(this),
        );
        return adaptPureExpression(expression);
    }

    #functionOptionalParenthesesDecorator(expression) {
        //TODO: move into separated function
        const matchedExpr = this.optionalParenthesesRegex.exec(expression)?.[0];
        if(matchedExpr == null) return expression;

        const operand = Regex.NUMBER.exec(matchedExpr)?.[0];
        const operationSign = matchedExpr.replace(operand, "");

        let result;
        if(this.prefixFunctionNamesRegex.exec(expression)?.[0] != null) {
            result = operationSign.concat(`(${operand})`);
        } else {
            result = `(${operand})`.concat(operationSign);
        }

        return expression.replace(matchedExpr, result);
    }

    #getOptionalParenthesesRegex() {
        const operationsList = this.operationQueue.find(el => el.operationCategory === Operations.FUNCTION).operations;
        const { prefixFunction, postfixFunction} =  getFunctionOperationSignsRegexSource(operationsList);
        return new RegExp(`(${prefixFunction}${Regex.NUMBER.source})|(${Regex.NUMBER.source}${postfixFunction})`);
    }

    #getPrefixFunctionNamesRegex() {
        const operationsList = this.operationQueue.find(el => el.operationCategory === Operations.FUNCTION).operations;
        const { prefixFunction} =  getFunctionOperationSignsRegexSource(operationsList);
        return new RegExp(prefixFunction);
    }
}