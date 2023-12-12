import {operators} from "userConfig/operations/operatorsConfig.js";
import {functions} from "userConfig/operations/functionsConfig.js";
import {constants} from "userConfig/operations/constantsConfig.js";
import {signs} from "userConfig/operations/signsConfig.js";
import {OperationCategoryName} from "userConfig/constants/operationCategoryName";
import {UserConfig} from "userConfig/operations/types";

export const operationsConfig: UserConfig = {
    [OperationCategoryName.CONSTANT]: constants,
    [OperationCategoryName.SIGN]: signs,
    [OperationCategoryName.FUNCTION]: functions,
    [OperationCategoryName.OPERATOR]: operators,
};
