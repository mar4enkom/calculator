import {ValidationService} from "../controller/ValidationService.js";
import {getValidationErrors} from "../../../utils/getValidationErrors.js";
import {removeSpaces} from "../../../utils/removeSpaces.js";
import {Symbols} from "../../../constants/constants.js";
import {Regex} from "../../../constants/regex.js";
import {Operations} from "../../../constants/operations.js";
import {stringIsNumber} from "../../../utils/stringIsNumber.js";
import {toNumberArray} from "../../../utils/toNumberArray.js";
import {OperationQueueInitializer} from "./configInitializer/OperationQueueInitializer.js";
import {Observable} from "./Observable.js";
import {safeRegexSymbol} from "../../../utils/safetyRegexSymbol.js";
import {operationsConfig} from "../../../../userConfig/operations/index.js";
import {PureExpressionDecorator} from "./PureExpressionDecorator.js";

export const ObservableType = {
    VALIDATION_ERROR: "error",
    CALCULATION_RESULT: "result",
}

const INVALID_EXPRESSION_INPUT_ERROR = "Invalid expression input";

export class CalculateExpressionService extends Observable {
    constructor(operationsConfig) {
        super();
        const operationQueue = OperationQueueInitializer.getInstance().init(operationsConfig);
        this.operationQueue = operationQueue;
        this.pureExpressionDecorator = new PureExpressionDecorator(operationQueue);
    }

    calculate(expression) {
        //try {
            const calculationResult = this.#calculateExpression(expression);
            const validationResultErrors = this.#getValidationResultErrors(calculationResult);
            if(validationResultErrors != null) return this.notify(ObservableType.VALIDATION_ERROR, validationResultErrors);
            this.notify(ObservableType.CALCULATION_RESULT, calculationResult)
        // } catch (e) {
        //     this.notify(ObservableType.VALIDATION_ERROR, [INVALID_EXPRESSION_INPUT_ERROR])
        // }
    }

    #calculateExpression(expression) {
        let currentExpression = expression;
        let matchedParenthesesExpression;
        while((matchedParenthesesExpression = Regex.LARGEST_NESTING.exec(currentExpression)?.[0]) != null) {
            const innerMatchedParenthesesExpression = matchedParenthesesExpression.slice(1, matchedParenthesesExpression.length-1);
            const operationResult = this.#calculatePureExpression(innerMatchedParenthesesExpression);
            if(operationResult?.errors?.length > 0) return operationResult;
            currentExpression = currentExpression.replace(matchedParenthesesExpression, operationResult);
        }
        return this.#calculatePureExpression(currentExpression);
    }

    #calculatePureExpression(expression) {
        let result = expression;

        if(stringIsNumber(result)) return result;
        for(const operationCategory of this.operationQueue) {
            result = this.pureExpressionDecorator.apply(result);
            while(operationCategory.extractOperationBody(result) != null) {
                const operationBody = operationCategory.extractOperationBody(result);
                const operatorSign = operationCategory.extractOperationSign(operationBody);
                const operands = operationCategory
                    .extractOperands(operatorSign, operationBody)
                    .map(expr => this.#calculatePureExpression(expr));
                const operatorProps = operationCategory.operations.find(el => el.sign === operatorSign);
                const operationResult = operatorProps.calc(...toNumberArray(operands));
                if(operationResult?.errors?.length > 0) return operationResult;
                result = result.replace(operationBody, operationResult);
                if(stringIsNumber(result)) return result;
            }
        }
    }

    #getValidationResultErrors(calculationResult) {
        const invalidCalculationResult = calculationResult == null || Number.isNaN(calculationResult);
        return invalidCalculationResult
            ? [INVALID_EXPRESSION_INPUT_ERROR]
            : calculationResult?.errors;
    }
}
