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
import {getInnermostNestingRegex} from "../utils/regex/getInnermostNestingRegex.js";
import {extractFunctionsObject} from "../utils/extractFunctionsObject.js";
import {createMemoRegex} from "../utils/createMemoRegex.js";
import {applyPureExpressionAdapter} from "../utils/adapter/applyPureExpressionAdapter.js";
import {CalculationError} from "../helpers/CalculationError.js";

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
            return this.calculateExpression(expression);
        } catch (e) {
            return e;
        }
    }

    calculateExpression(expression) {
        const largestNestingRegex = getInnermostNestingRegex(this.operationQueue);
        let currentExpression = expression;
        let matchedNesting;
        while ((matchedNesting = largestNestingRegex.exec(currentExpression)?.groups?.innermostNesting) != null) {
            const operationResult = this.calculatePureExpression(matchedNesting);
            currentExpression = currentExpression.replace(`(${matchedNesting})`, operationResult);
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
                this.#throwIfErrors(operationResult);
                result = result.replace(operationBody, operationResult);
                if (stringIsNumber(result)) return result;
            }
        }
        throw new CalculationError(CalculationErrors[CalculationErrorCodes.INVALID_EXPRESSION_INPUT_ERROR]);
    }

    #throwIfErrors(operationResult) {
        if(operationResult == null || Number.isNaN(operationResult)) {
            throw new CalculationError(CalculationErrors[CalculationErrorCodes.INVALID_EXPRESSION_INPUT_ERROR]);
        } else if(operationResult.errors != null) {
            throw new CalculationError(operationResult.errors);
        }
    }
}
