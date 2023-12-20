export interface CalculationResult {
    result: string | undefined;
}

export type CustomErrorType<T extends string = string> = {
    message: string;
    code: T;
};

export type ErrorMap<T extends string> = Record<T, CustomErrorType<T>>

export interface CalculationErrors {
    errors: CustomErrorType[]
}

export type CalculateExpressionReturnType = CalculationResult | CalculationErrors;

export interface CalculatorService {
    calculate: (expr: string) => CalculateExpressionReturnType;
}
