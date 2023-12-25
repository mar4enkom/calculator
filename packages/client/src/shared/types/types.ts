import {ErrorBody} from "@calculator/common";
import {QueryResult} from "api/types";

export type CalculationResult = string | undefined;
export type ExpressionCalculationResult = QueryResult<CalculationResult, ErrorBody>
