import {Operations} from "UserConfig/constants/operations.js";
import {Regex} from "../../constants/regex.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {stringIsNumber} from "../../utils/stringIsNumber.js";
import {safeRegexSymbol} from "../../utils/safetyRegexSymbol.js";
import {
    getOperationSignsRegexSource
} from "../../utils/createRegex/operations/getOperationSignsRegexSource.js";
import {createMemoRegex} from "../../utils/createMemoRegex.js";
import {OperationQueueDecorator} from "./OperationQueueDecorator/OperationQueueDecorator.js";
import {
    getFunctionOperationSignsRegexSource
} from "../../utils/createRegex/operations/getFunctionOperationSignsRegexSource.js";
import {getFunctionRegexSource} from "../../utils/createRegex/operations/getFunctionRegexSource.js";
import {OperationsPriorityQueueInitializer} from "./OperationsPriorityQueueInitializer.js";

export class OperationQueueInitializer {
    static instance;

    static getInstance() {
        if(!OperationQueueInitializer.instance) {
            OperationQueueInitializer.instance = new OperationQueueInitializer();
        }
        return OperationQueueInitializer.instance;
    }

    init(initialConfig) {
        if(!initialConfig) throw new Error("No config was passed");

        const operationPriorityQueue = OperationsPriorityQueueInitializer
            .getInstance()
            .init(initialConfig);

        return OperationQueueDecorator
            .getInstance()
            .applyDecorators(operationPriorityQueue);
    }
}