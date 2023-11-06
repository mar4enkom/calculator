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
import {PureExpressionAdapter} from "../helpers/PureExpressionAdapter.js";
import {CalculationErrorCodes} from "../constants/errorCodes.js";
import {CalculationErrors} from "../constants/errors.js";
import {ObservableType} from "../../shared/constants.js";
import {getLargestNestingRegex} from "../utils/regex/getLargestNestingRegex.js";
import {extractFunctionsObject} from "../utils/extractFunctionsObject.js";
import {createMemoRegex} from "../utils/createMemoRegex.js";

export class CalculateExpressionService extends Observable {
    constructor(operationsConfig) {
        super();

        this.operationQueue = OperationQueueInitializer.getInstance().init(operationsConfig);
        this.pureExpressionAdapter = new PureExpressionAdapter(this.operationQueue);
    }

    process(expression) {
        const result = this.calculate(expression);

        if(result?.errors?.length > 0) {
            return this.notify(ObservableType.VALIDATION_ERROR, result?.errors)
        }
        this.notify(ObservableType.CALCULATION_RESULT, result);
    }

    calculate(expression) {
        if(expression == null || expression === "") return undefined;
        try {
            const calculationResult = this.calculateExpression(expression);
            const validationResultErrors = this.getValidationResultErrors(calculationResult);
            if (validationResultErrors != null) return { errors: validationResultErrors };
            return calculationResult;
        } catch (e) {
            return { errors: [CalculationErrors[CalculationErrorCodes.INVALID_EXPRESSION_INPUT_ERROR]] };
        }
    }

    calculateExpression(expression) {
        const largestNestingRegex = createMemoRegex(getLargestNestingRegex(this.operationQueue));
        let currentExpression = expression;
        let matchedParenthesesExpression;
        while ((matchedParenthesesExpression = largestNestingRegex.exec(currentExpression)?.[0]) != null) {
            const innerMatchedParenthesesExpression = matchedParenthesesExpression.slice(1, matchedParenthesesExpression.length - 1);
            const operationResult = this.calculatePureExpression(innerMatchedParenthesesExpression);
            if (operationResult?.errors?.length > 0) return operationResult;
            currentExpression = currentExpression.replace(matchedParenthesesExpression, operationResult);
        }

        return this.calculatePureExpression(currentExpression);
    }

    calculatePureExpression(expression) {
        let result = this.pureExpressionAdapter.apply(expression);

        if (stringIsNumber(result)) return result;
        for (const operationCategory of this.operationQueue) {
            while (operationCategory.extractOperationBody(result) != null) {
                const operationBody = operationCategory.extractOperationBody(result);
                const operatorSign = operationCategory.extractOperationSign(operationBody);
                const operands = operationCategory
                    .extractOperands(operatorSign, operationBody)
                    .map(expr => this.calculatePureExpression(expr));
                const operatorProps = operationCategory.operations.find(el => el.sign === operatorSign);
                const operationResult = operatorProps.calc(...toNumberArray(operands));
                if (operationResult?.errors?.length > 0) return operationResult;
                result = result.replace(operationBody, operationResult);
                if (stringIsNumber(result)) return result;
            }
        }
    }

    getValidationResultErrors(calculationResult) {
        const invalidCalculationResult = calculationResult == null || Number.isNaN(calculationResult);
        return invalidCalculationResult
            ? [CalculationErrors[CalculationErrorCodes.INVALID_EXPRESSION_INPUT_ERROR]]
            : calculationResult?.errors;
    }
}
