import {CustomErrorType} from "./errors";

export interface CalculationResult {
    result: string | undefined;
}

export interface CalculationErrors {
    errors: CustomErrorType[]
}

export type CalculateExpressionReturnType = CalculationResult | CalculationErrors;

export interface CalculatorService {
    calculate: (expr: string) => CalculateExpressionReturnType;
}
