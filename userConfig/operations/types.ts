import {OperationCategoryName} from "userConfig/constants/operationCategoryName";

type OperationValidationName = "nonNegativeArguments";

type OperationValidation = Record<OperationValidationName, boolean>;

export type CalculateExpressionFunction = (...args: any[]) => number;

type BaseOperation = {
    name: string;
    sign: string;
    calculateExpression: CalculateExpressionFunction;
    priority?: number;
    validations?: OperationValidation;
}

type FunctionOperation = BaseOperation & {
    postfixForm?: boolean;
}

export type Operation = BaseOperation | FunctionOperation;

export type BaseOperationList = BaseOperation[];
export type FunctionOperationList = FunctionOperation[];
export type OperationList = BaseOperationList | FunctionOperationList;

export type UserConfig = Record<OperationCategoryName, OperationList>;
