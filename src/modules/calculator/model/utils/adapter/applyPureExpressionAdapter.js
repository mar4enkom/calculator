import {compose} from "../../../shared/utils/composeFunctions.js";
import {functionOptionalParenthesesAdapter} from "./functionOptionalParenthesesAdapter.js";

export function applyPureExpressionAdapter(expression, operationQueue) {
    const adaptPureExpression = compose(functionOptionalParenthesesAdapter);

    return adaptPureExpression(expression, operationQueue);
}