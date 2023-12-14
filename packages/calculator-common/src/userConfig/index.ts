import {UserConfig} from "../types/userConfig";
import {constants} from "./operations/constantsConfig";
import {signs} from "./operations/signsConfig";
import {functions} from "./operations/functionsConfig";
import {operators} from "./operations/operatorsConfig";

export const operationsConfig: UserConfig = {
    constant: constants,
    sign: signs,
    function: functions,
    operator: operators,
};
