import {constants} from "./operations/constantsConfig";
import {signs} from "./operations/signsConfig";
import {functions} from "./operations/functionsConfig";
import {operators} from "./operations/operatorsConfig";
import {UserConfig} from "../../types/api/modules/userConfig";

export const operationsConfig: UserConfig = {
    constant: constants,
    sign: signs,
    function: functions,
    operator: operators,
};
