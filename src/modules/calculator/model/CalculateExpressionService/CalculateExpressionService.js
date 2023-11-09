import {Numbers, Symbols} from "../../../../../userConfig/operations/constants/constants.js";
import {Regex} from "../constants/regex.js";
import {Operations} from "../../../../../userConfig/operations/constants/operations.js";
import {stringIsNumber} from "../utils/stringIsNumber.js";
import {toNumberArray} from "../utils/toNumberArray.js";
import {OperationQueueInitializer} from "../helpers/OperationQueueInitializer.js";
import {operationsConfig} from "../../../../../userConfig/operations/index.js";
import {CalculationErrorCodes} from "../constants/errorCodes.js";
import {CalculationErrors} from "../constants/errors.js";
import {getInnermostNestingRegex} from "../utils/regex/getInnermostNestingRegex.js";
import {applyPureExpressionAdapter} from "../utils/adapter/applyPureExpressionAdapter.js";
import {CalculationError} from "../helpers/CalculationError.js";
import {compose} from "../../shared/utils/composeFunctions.js";
import {removeSpaces} from "../utils/prepareExpression/removeSpaces.js";
import {toLowerCase} from "../utils/prepareExpression/toLowerCase.js";
import {parenthesize} from "../utils/parenthesize.js";
import {Observable} from "../helpers/Observable.js";
import {ObservableType} from "../../shared/constants.js";
import {resolveNumberAliases} from "../utils/prepareExpression/resolveNumberAliases.js";

export class CalculateExpressionService extends Observable {
    constructor(operationsConfig) {
        super();
        this.operationQueue = OperationQueueInitializer.getInstance().init(operationsConfig);
    }

    notifyCalculationResult(expression) {
        this.notify(ObservableType.CALCULATION_RESULT, this.calculate(expression));
    }

    calculate(expression) {
        try {
            const preparedExpression = this.#prepareExpression(expression);
            const largestNestingRegex = getInnermostNestingRegex(this.operationQueue);
            let currentExpression = preparedExpression;
            let matchedNesting;
            while ((matchedNesting = largestNestingRegex.exec(currentExpression)?.groups?.innermostNesting) != null) {
                const operationResult = this.calculatePureExpression(matchedNesting);
                currentExpression = currentExpression.replace(parenthesize(matchedNesting), operationResult);
            }
            return this.calculatePureExpression(currentExpression);
        } catch (e) {
            return e;
        }
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
                this.#throwIfResultHasError(operationResult);
                result = result.replace(operationBody, operationResult);
                if (stringIsNumber(result)) return result;
            }
        }
        throw new CalculationError(CalculationErrors[CalculationErrorCodes.INVALID_EXPRESSION_INPUT_ERROR]);
    }

    #throwIfResultHasError(operationResult) {
        if(operationResult == null || Number.isNaN(operationResult)) {
            throw new CalculationError(CalculationErrors[CalculationErrorCodes.INVALID_EXPRESSION_INPUT_ERROR]);
        } else if(operationResult.errors != null) {
            throw new CalculationError(operationResult.errors);
        }
    }

    #prepareExpression(expression) {
        const prepare = compose(removeSpaces, toLowerCase,
            //resolveNumberAliases
        );
        return prepare(expression, Numbers);
    }
}
