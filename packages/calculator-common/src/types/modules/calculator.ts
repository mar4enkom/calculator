import {CustomErrorType} from "../common/errors";

export interface CalculationResult {
    result: string | undefined;
}

export interface CalculationErrors {
    errors: CustomErrorType[]
}

export type CalculateExpressionReturnType = CalculationResult | CalculationErrors;
