import {NonEmptyArray} from "../../../types/common/typeUtils";
import {HistoryItem} from "../types";

// Provides a list of possible keys by which the history items can be sorted for zod validation
export const historySortByKeyNames = ((): NonEmptyArray<keyof HistoryItem> => {
    const sortByPossibleValues: Record<keyof HistoryItem, undefined> = {
        id: undefined,
        expression: undefined,
        expressionResult: undefined,
        createdAt: undefined
    }
    return Object.keys(sortByPossibleValues) as NonEmptyArray<keyof HistoryItem>;
})()