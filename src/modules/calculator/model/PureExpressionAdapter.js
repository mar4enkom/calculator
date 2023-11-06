import {Operations} from "../../../constants/operations.js";
import {safeRegexSymbol} from "../../../utils/safetyRegexSymbol.js";
import {Regex} from "../../../constants/regex.js";
import {Symbols} from "../../../constants/constants.js";
import {
    getFunctionOperationSignsRegexSource,
    getOperationSignsRegexSource
} from "./utils/getOperationSignsRegexSource.js";
import {compose} from "../../../utils/composeFunctions.js";
import {extractFunctionsObject} from "../../../utils/extractFunctionsObject.js";
import {functionOptionalParenthesesAdapter} from "./utils/adapter/functionOptionalParenthesesAdapter.js";

export class PureExpressionAdapter {
    constructor(operationQueue) {
        this.operationQueue = operationQueue;
    }

    apply(expression) {
        const adaptPureExpression = compose(
            functionOptionalParenthesesAdapter,
        );
        return adaptPureExpression(expression, this.operationQueue);
    }
}