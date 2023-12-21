type OperationValidationName = "nonNegativeArguments";

type OperationValidation = Record<OperationValidationName, boolean>;

export type CalculateExpressionFunction = (...args: any[]) => number;
type BasicOperation = {
    name: string;
    sign: string;
    calculateExpression: CalculateExpressionFunction;
    priority?: number;
    validations?: OperationValidation;
}

type FunctionOperation = BasicOperation & {
    postfixForm?: boolean;
}

export type Operation = BasicOperation | FunctionOperation;

export type BasicOperationList = BasicOperation[];
export type FunctionOperationList = FunctionOperation[];
export type OperationList = BasicOperationList | FunctionOperationList;

export enum OperationCategoryNames {
    FUNCTION = "function",
    CONSTANT = "constant",
    SIGN = "sign",
    OPERATOR = "operator",
}

export type UserConfig = Record<OperationCategoryNames, OperationList>;
