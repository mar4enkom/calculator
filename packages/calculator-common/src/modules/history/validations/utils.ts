import {NonEmptyArray} from "../../../types/common/typeUtils";
import {HistoryItem} from "../types";

export const historySortByKeyNames = ((): NonEmptyArray<keyof HistoryItem> => {
    const sortByPossibleValues: Record<keyof HistoryItem, undefined> = {
        id: undefined,
        expression: undefined,
        expressionResult: undefined,
        calculationDate: undefined
    }
    return Object.keys(sortByPossibleValues) as NonEmptyArray<keyof HistoryItem>;
})()