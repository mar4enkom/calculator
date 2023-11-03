import {Operations} from "../../../constants/operations.js";
import {safeRegexSymbol} from "../../../utils/safetyRegexSymbol.js";
import {Regex} from "../../../constants/regex.js";
import {Symbols} from "../../../constants/constants.js";
import {getOperationsSignRangeRegexSource} from "./utils/getOperationsSignRangeRegexSource.js";
import {compose} from "../../../utils/composeFunctions.js";
import {logPlugin} from "@babel/preset-env/lib/debug.js";

export class PureExpressionAdapter {
    constructor(operationQueue) {
        this.operationQueue = operationQueue;

        this.optionalParenthesesRegex = this.#getOptionalParenthesesRegex();
        this.postfixExpressionRegex = this.#getPostfixExpressionRegexp();
    }

    apply(expression) {
        //order of applying decorators is important
        const adaptPureExpression = compose(
            this.#functionOptionalParenthesesDecorator.bind(this),
            this.#functionPrefixDecorator.bind(this)
        );
        console.log(adaptPureExpression(expression));
        return adaptPureExpression(expression);
    }

    #functionPrefixDecorator(expression) {
        if(this.postfixExpressionRegex == null) return expression;

        let currentExpression = expression;
        let matchedExpr;

        while ((matchedExpr = this.postfixExpressionRegex.exec(currentExpression)?.[0]) != null) {
            const rightParenthesesIndex = matchedExpr.lastIndexOf(Symbols.RP);
            const expressionSign = matchedExpr.slice(rightParenthesesIndex+1);
            const matchedExprWithoutSign = matchedExpr.slice(matchedExpr, rightParenthesesIndex+1)
            const prefixFormExpression = expressionSign.concat(matchedExprWithoutSign);
            currentExpression = currentExpression.replace(matchedExpr, prefixFormExpression);
        }

        return currentExpression;
    }

    #functionOptionalParenthesesDecorator(expression) {
        const matchedExpr = this.optionalParenthesesRegex.exec(expression)?.[0];
        if(matchedExpr == null) return expression;

        const operand = Regex.NUMBER.exec(matchedExpr)?.[0];
        const operationSign = matchedExpr.replace(operand, "");
        return operationSign.concat(`(${operand})`)
    }

    #getPostfixExpressionRegexp() {
        const functionOperations = this.operationQueue.find(el => el.operationCategory === Operations.FUNCTION).operations;
        const postfixOperationsSymbols = functionOperations.filter(el => el.postfixForm);
        const postfixFunctionOperations = postfixOperationsSymbols.map(el => safeRegexSymbol(el.sign)).join("|");

        if(postfixFunctionOperations.length === 0) return null;
        return new RegExp(`(?<=[^a-z0-9!]|^)\\(([^()]|[a-z]\\w+\\(([^()]*)\\))*\\)${postfixFunctionOperations}`);
    }

    #getOptionalParenthesesRegex() {
        const functionOperations = this.operationQueue.find(el => el.operationCategory === Operations.FUNCTION).operations;
        const functionOperationSymbolsRegexSource =  getOperationsSignRangeRegexSource(functionOperations);
        const preNumberDeclaration = `${functionOperationSymbolsRegexSource}${Regex.NUMBER.source}`;
        const postNumberDeclaration = `${Regex.NUMBER.source}${functionOperationSymbolsRegexSource}`;
        return new RegExp(`(${preNumberDeclaration})|(${postNumberDeclaration})`);
    }
}