import {Numbers, Symbols} from "UserConfig/constants/constants.js";
import {Regex} from "../constants/regex.js";
import {Operations} from "UserConfig/constants/operations.js";
import {stringIsNumber} from "../utils/stringIsNumber.js";
import {toNumberArray} from "../utils/toNumberArray.js";
import {OperationQueueInitializer} from "../helpers/OperationQueueInitializer/OperationQueueInitializer.js";
import {operationsConfig} from "UserConfig/index.js";
import {CalculationErrorCodes} from "../constants/errorCodes.js";
import {CalculationErrors} from "../constants/errors.js";
import {getInnermostNestingRegex} from "../utils/createRegex/getInnermostNestingRegex.js";
import {applyPureExpressionAdapter} from "../utils/adapter/applyPureExpressionAdapter.js";
import {CalculationError} from "../helpers/CalculationError.js";
import {compose} from "../../shared/utils/composeFunctions.js";
import {removeSpaces} from "../../controller/utils/prepareExpression/removeSpaces.js";
import {toLowerCase} from "../../controller/utils/prepareExpression/toLowerCase.js";
import {parenthesize} from "../utils/parenthesize.js";
import {Observable} from "../helpers/Observable.js";
import {ObservableType} from "../../shared/constants.js";
import {resolveNumberAliases} from "../../controller/utils/prepareExpression/resolveNumberAliases.js";
import {createMemoRegex} from "../utils/createMemoRegex.js";
import {getFirstMatch} from "../../shared/utils/regexUtils/getFirstMatch.js";

export class CalculateExpressionService extends Observable {
    constructor(operationsConfig) {
        super();
        this.operationQueue = OperationQueueInitializer.getInstance().init(operationsConfig);
    }

    calculateAndNotify(expression) {
        this.notify(ObservableType.CALCULATION_RESULT, this.calculate(expression));
    }

    calculate(expression) {
        //TODO: add comment
        if(expression == null || expression === "") return undefined;
        try {
            return this.#calculateAdaptedExpression(expression);
        } catch (e) {
            return e instanceof CalculationError ? e : new CalculationError();
        }
    }

    #calculateAdaptedExpression(expression) {
        let currentExpression = expression;
        let matchedNesting;
        const innermostNestingRegex = createMemoRegex(getInnermostNestingRegex(this.operationQueue));
        while ((matchedNesting = getFirstMatch(innermostNestingRegex, currentExpression, "innermostNesting")) != null) {
            const operationResult = this.#calculateInnermostExpression(matchedNesting);
            currentExpression = currentExpression.replace(parenthesize(matchedNesting), operationResult);
        }
        return this.#calculateInnermostExpression(currentExpression);
    }

    #calculateInnermostExpression(expression) {
        let result = applyPureExpressionAdapter(expression, this.operationQueue);

        if (stringIsNumber(result)) return result;
        for (const operationCategory of this.operationQueue) {
            let operationBody;
            while ((operationBody = getFirstMatch(operationCategory.operationBodyRegex, result)) != null) {
                const operatorSign = getFirstMatch(operationCategory.operationSignRegex, operationBody);
                const operands = operationCategory
                    .extractOperands(operatorSign, operationBody)
                    .map(expr => this.#calculateInnermostExpression(expr));
                const operatorProps = operationCategory.operations.find(el => el.sign === operatorSign);
                const operationResult = operatorProps.calc(...toNumberArray(operands));
                this.#throwIfResultHasError(operationResult);
                result = result.replace(operationBody, operationResult);
                if (stringIsNumber(result)) return result;
            }
        }
        throw new CalculationError();
    }

    #throwIfResultHasError(operationResult) {
        if(operationResult.errors != null) {
            throw new CalculationError(operationResult.errors);
        }
    }
}
