import {operatorsHighPriority, operatorsLowPriority} from "./configs/operatorsConfig.js";
import {functions} from "./configs/functionsConfig.js";
import {constants} from "./configs/constantsConfig.js";
import {signs} from "./configs/signsConfig.js";
import {Operations} from "./constants.js";

export const operationsConfig = {
    [Operations.CONSTANT]: constants,
    [Operations.SIGN]: signs,
    [Operations.FUNCTION]: functions,
    [Operations.OPERATOR_HIGH_PRIORITY]: operatorsHighPriority,
    [Operations.OPERATOR_LOW_PRIORITY]: operatorsLowPriority,
};


