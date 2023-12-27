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

type DigitsSymbolKey = "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" | "SIX" | "SEVEN" | "EIGHT" | "NINE";
export type DigitSymbols = Record<DigitsSymbolKey, string>

type SymbolKey = "LP" | "RP" | "COMMA" | "EQUALS" | "DOT" | "CE" | "MINUS" | "INFINITY";
export type Symbols = Record<SymbolKey, string>;

export type OperationsConfig = Record<OperationCategoryNames, OperationList>;
