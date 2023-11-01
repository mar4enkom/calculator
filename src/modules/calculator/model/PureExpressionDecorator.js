import {Operations} from "../../../constants/operations.js";
import {safeRegexSymbol} from "../../../utils/safetyRegexSymbol.js";
import {Regex} from "../../../constants/regex.js";
import {Symbols} from "../../../constants/constants.js";
import {getOperationsSignRangeRegexSource} from "./utils/getOperationsSignRangeRegexSource.js";
import {compose} from "../../../utils/composeFunctions.js";

export class PureExpressionDecorator {
    constructor(operationQueue) {
        this.operationQueue = operationQueue;

        this.optionalParenthesesRegex = this.#getOptionalParenthesesRegex();
        this.postfixExpressionRegex = this.#getPostfixExpressionRegexp();
    }

    apply(expression) {
        //order of applying decorators is important
        const pureExpressionDecorator = compose(
            this.#functionOptionalParenthesesDecorator.bind(this),
            this.#functionPrefixDecorator.bind(this)
        );
        return pureExpressionDecorator(expression);
    }

    #functionPrefixDecorator(expression) {
        if(this.postfixExpressionRegex == null) return expression;

        const matchedExpr = this.postfixExpressionRegex.exec(expression)?.[0];
        if(matchedExpr == null) return expression;
        const rightParenthesesIndex = matchedExpr.indexOf(Symbols.RP);
        const expressionSign = matchedExpr.slice(rightParenthesesIndex+1);
        const matchedExprWithoutSign = matchedExpr.slice(matchedExpr, rightParenthesesIndex+1)
        const prefixFormExpression = expressionSign.concat(matchedExprWithoutSign);

        return expression.replace(matchedExpr, prefixFormExpression);
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
        return new RegExp(`${Regex.NESTING_WITHOUT_PARENTHESES.source}${postfixFunctionOperations}`);
    }

    #getOptionalParenthesesRegex() {
        const functionOperations = this.operationQueue.find(el => el.operationCategory === Operations.FUNCTION).operations;
        const functionOperationSymbolsRegexSource =  getOperationsSignRangeRegexSource(functionOperations);
        const preNumberDeclaration = `${functionOperationSymbolsRegexSource}${Regex.NUMBER.source}`;
        const postNumberDeclaration = `${Regex.NUMBER.source}${functionOperationSymbolsRegexSource}`;
        return new RegExp(`(${preNumberDeclaration})|(${postNumberDeclaration})`);
    }
}