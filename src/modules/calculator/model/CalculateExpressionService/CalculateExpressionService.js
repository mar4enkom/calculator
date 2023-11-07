import {getValidationErrors} from "../../shared/utils/getValidationErrors.js";
import {Symbols} from "../../../../../userConfig/operations/constants/constants.js";
import {Regex} from "../constants/regex.js";
import {Operations} from "../../../../../userConfig/operations/constants/operations.js";
import {stringIsNumber} from "../utils/stringIsNumber.js";
import {toNumberArray} from "../utils/toNumberArray.js";
import {OperationQueueInitializer} from "../helpers/OperationQueueInitializer.js";
import {Observable} from "../helpers/Observable.js";
import {safeRegexSymbol} from "../utils/safetyRegexSymbol.js";
import {operationsConfig} from "../../../../../userConfig/operations/index.js";
import {CalculationErrorCodes} from "../constants/errorCodes.js";
import {CalculationErrors} from "../constants/errors.js";
import {ObservableType} from "../../shared/constants.js";
import {getLargestNestingRegex} from "../utils/regex/getLargestNestingRegex.js";
import {extractFunctionsObject} from "../utils/extractFunctionsObject.js";
import {createMemoRegex} from "../utils/createMemoRegex.js";
import {applyPureExpressionAdapter} from "../utils/adapter/applyPureExpressionAdapter.js";

const invalidExpressionError = { errors: [CalculationErrors[CalculationErrorCodes.INVALID_EXPRESSION_INPUT_ERROR]] };

export class CalculateExpressionService extends Observable {
    constructor(operationsConfig) {
        super();

        this.operationQueue = OperationQueueInitializer.getInstance().init(operationsConfig);
    }

    process(expression) {
        const result = this.calculate(expression);

        if(result?.errors?.length > 0) {
            return this.notify(ObservableType.VALIDATION_ERROR, result?.errors)
        }
        this.notify(ObservableType.CALCULATION_RESULT, result);
    }

    calculate(expression) {
        try {
            const calculationResult = this.calculateExpression(expression);
            if (calculationResult?.errors != null) return calculationResult;
            return calculationResult;
        } catch (e) {
            return invalidExpressionError;
        }
    }

    calculateExpression(expression) {
        const largestNestingRegex = createMemoRegex(getLargestNestingRegex(this.operationQueue));
        let currentExpression = expression;
        let matchedParenthesesExpression;
        while ((matchedParenthesesExpression = largestNestingRegex.exec(currentExpression)?.[0]) != null) {
            const innerMatchedParenthesesExpression = matchedParenthesesExpression.slice(1, matchedParenthesesExpression.length - 1);
            const operationResult = this.calculatePureExpression(innerMatchedParenthesesExpression);
            const operationErrors = this.#getOperationErrors(operationResult);
            if (operationErrors != null) return operationErrors;
            currentExpression = currentExpression.replace(matchedParenthesesExpression, operationResult);
        }

        return this.calculatePureExpression(currentExpression);
    }

    calculatePureExpression(expression) {
        let result = applyPureExpressionAdapter(expression, this.operationQueue);

        if (stringIsNumber(result)) return result;
        for (const operationCategory of this.operationQueue) {
            let operationBody;
            while ((operationBody = operationCategory.operationBodyRegex.exec(result)?.[0]) != null) {
                const operatorSign = operationCategory.operationSignRegex.exec(operationBody)?.[0];
                const operands = operationCategory
                    .extractOperands(operatorSign, operationBody)
                    .map(expr => this.calculatePureExpression(expr));
                const operatorProps = operationCategory.operations.find(el => el.sign === operatorSign);
                const operationResult = operatorProps.calc(...toNumberArray(operands));
                const operationErrors = this.#getOperationErrors(operationResult);
                if (operationErrors != null) return operationErrors;
                result = result.replace(operationBody, operationResult);
                if (stringIsNumber(result)) return result;
            }
        }
        return invalidExpressionError;
    }

    #getOperationErrors(operationResult) {
        if(operationResult == null || Number.isNaN(operationResult)) {
            return invalidExpressionError;
        } else if(operationResult.errors != null) {
            return operationResult;
        }
    }
}
