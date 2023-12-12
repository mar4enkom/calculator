import {OperationList} from "userConfig/operations/types";

export type ExtractOperandsFunction = (sign: string, expression: string) => string[];
export interface IOperationDetails {
    getBodyRegex: (a: OperationList) => RegExp;
    getOperationSignRegex: (a: OperationList) => RegExp;
    extractOperands: ExtractOperandsFunction;
}