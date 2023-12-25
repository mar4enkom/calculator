import {ErrorBody} from "@calculator/common";

export type CalculationResult = string | undefined;
export type ExpressionCalculatorReturn =
    | { result: CalculationResult }
    | { errors: ErrorBody };