import {Operations} from "UserConfig/constants/operations.js";
import {functionsProps} from "./functions.js";
import {operationsProps} from "./operations.js";
import {signsProps} from "./signs.js";
import {constantsProps} from "./constants.js";

export const operationHelpers = {
    [Operations.FUNCTION]: functionsProps,
    [Operations.OPERATOR]: operationsProps,
    [Operations.SIGN]: signsProps,
    [Operations.CONSTANT]: constantsProps,
}