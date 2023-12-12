import {operators} from "userConfig/operations/operatorsConfig";
import {functions} from "userConfig/operations/functionsConfig";
import {constants} from "userConfig/operations/constantsConfig";
import {signs} from "userConfig/operations/signsConfig";
import {OperationCategoryName} from "userConfig/constants/operationCategoryName";
import {UserConfig} from "userConfig/operations/types";

export const operationsConfig: UserConfig = {
    [OperationCategoryName.CONSTANT]: constants,
    [OperationCategoryName.SIGN]: signs,
    [OperationCategoryName.FUNCTION]: functions,
    [OperationCategoryName.OPERATOR]: operators,
};
