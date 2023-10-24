import {operatorsHighPriority, operatorsLowPriority} from "./configs/operatorsConfig.js";
import {functions} from "./configs/functionsConfig/functionsConfig.js";
import {constants} from "./configs/constantsConfig.js";
import {signs} from "./configs/signsConfig.js";
import {getOperationObject} from "./utils/getOperationObject.js";
import {Operations} from "./constants.js";

export const operationsConfig = {
    ...getOperationObject(constants, Operations.CONSTANT),
    ...getOperationObject(signs, Operations.SIGN),
    ...getOperationObject(functions, Operations.FUNCTION),
    ...getOperationObject(operatorsHighPriority, Operations.OPERATOR_HIGH_PRIORITY),
    ...getOperationObject(operatorsLowPriority, Operations.OPERATOR_LOW_PRIORITY),
};


