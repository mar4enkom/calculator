import {constants} from "./operations/constantsConfig";
import {signs} from "./operations/signsConfig";
import {functions} from "./operations/functionsConfig";
import {operators} from "./operations/operatorsConfig";
import {OperationsConfig} from "@calculator/common";

export const operationsConfig: OperationsConfig = {
    constant: constants,
    sign: signs,
    function: functions,
    operator: operators,
};
