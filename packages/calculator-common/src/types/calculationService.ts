export interface CalculationResult {
    result: string | undefined;
}

export type CustomErrorType<T extends string = string> = {
    message: string;
    code: T;
};

export interface CalculationErrors {
    errors: CustomErrorType[]
}

export type CalculateExpressionReturnType = CalculationResult | CalculationErrors;

export interface CalculatorService {
    calculate: (expr: string) => CalculateExpressionReturnType;
}
