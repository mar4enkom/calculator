import {operators} from "userConfig/operations/operatorsConfig";
import {functions} from "userConfig/operations/functionsConfig";
import {constants} from "userConfig/operations/constantsConfig";
import {signs} from "userConfig/operations/signsConfig";
import {UserConfig} from "userConfig/operations/types";

export const operationsConfig: UserConfig = {
    constant: constants,
    sign: signs,
    function: functions,
    operator: operators,
};
