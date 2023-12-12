import {CustomErrorType} from "calculatorService/types/errors";

interface CalculationResult {
    result: string | undefined;
}

interface CalculationErrors {
    errors: CustomErrorType[]
}

export type CalculateExpressionReturnType = CalculationResult | CalculationErrors;

export interface IExpressionCalculator {
    calculate: (expr: unknown) => CalculateExpressionReturnType;
}