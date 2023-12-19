import {Types} from "./types";
import {constants} from "./operations/constantsConfig";
import {signs} from "./operations/signsConfig";
import {functions} from "./operations/functionsConfig";
import {operators} from "./operations/operatorsConfig";

export const operationsConfig: Types = {
    constant: constants,
    sign: signs,
    function: functions,
    operator: operators,
};
