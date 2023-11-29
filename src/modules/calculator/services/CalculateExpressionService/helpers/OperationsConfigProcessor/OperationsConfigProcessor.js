import {Operations} from "UserConfig/constants/operations.js";
import {Regex} from "../../constants/regex.js";
import {Symbols} from "UserConfig/constants/constants.js";
import {stringIsNumber} from "../../utils/stringIsNumber.js";
import {safeRegexSymbol} from "../../utils/safetyRegexSymbol.js";
import {
    getOperationSignsRegexSource
} from "../../utils/createRegex/operations/getOperationSignsRegexSource.js";
import {createMemoRegex} from "../../utils/createMemoRegex.js";
import {OperationsDecorator} from "./OperationsDecorator/OperationsDecorator.js";
import {
    getFunctionOperationSignsRegexSource
} from "../../utils/createRegex/operations/getFunctionOperationSignsRegexSource.js";
import {getFunctionRegexSource} from "../../utils/createRegex/operations/getFunctionRegexSource.js";
import {OperationPrioritySorter} from "./OperationPrioritySorter.js";

export class OperationsConfigProcessor {
    static process(initialConfig) {
        if(!initialConfig) throw new Error("No config was passed");

        const prioritizedOperations = OperationPrioritySorter.sort(initialConfig);
        return OperationsDecorator.applyDecorators(prioritizedOperations);
    }
}