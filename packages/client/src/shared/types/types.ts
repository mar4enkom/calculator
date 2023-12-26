import {ErrorBody} from "@calculator/common";
import {QueryResult} from "api/types";

export type CalculationResult = string | null;
export type ExpressionCalculationResult = QueryResult<CalculationResult, ErrorBody>
