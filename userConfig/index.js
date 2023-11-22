import {operators} from "./operations/operatorsConfig.js";
import {functions} from "./operations/functionsConfig.js";
import {constants} from "./operations/constantsConfig.js";
import {signs} from "./operations/signsConfig.js";
import {Operations} from "./constants/operations.js";

export const operationsConfig = {
    [Operations.CONSTANT]: constants,
    [Operations.SIGN]: signs,
    [Operations.FUNCTION]: functions,
    [Operations.OPERATOR]: operators,
};
