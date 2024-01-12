import {NonEmptyArray} from "../../../types/common/typeUtils";
import {CalculationHistoryItem} from "../types";

export function getSortByFields(): NonEmptyArray<keyof CalculationHistoryItem> {
    const sortByPossibleValues: Record<keyof CalculationHistoryItem, undefined> = {
        id: undefined,
        expression: undefined,
        expressionResult: undefined,
        calculationDate: undefined
    }
    return Object.keys(sortByPossibleValues) as NonEmptyArray<keyof CalculationHistoryItem>;
}