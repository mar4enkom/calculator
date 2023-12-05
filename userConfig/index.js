import {operators} from "UserConfig/operations/operatorsConfig.js";
import {functions} from "UserConfig/operations/functionsConfig.js";
import {constants} from "UserConfig/operations/constantsConfig.js";
import {signs} from "UserConfig/operations/signsConfig.js";
import {Operations} from "UserConfig/constants/operations.js";

export const operationsConfig = {
    [Operations.CONSTANT]: constants,
    [Operations.SIGN]: signs,
    [Operations.FUNCTION]: functions,
    [Operations.OPERATOR]: operators,
};
