import {NonEmptyArray} from "@calculator/common";

type FilterFunction<FilterParams, Data> = (a: Data, b: FilterParams) => Data;

export function composeFilters<FilterParams, Data>(
    initialData: Data,
    filterParams: FilterParams,
    filterFunctions: NonEmptyArray<FilterFunction<FilterParams, Data>>
): Data {
    return filterFunctions.reduce((acc: Data, func: FilterFunction<FilterParams, Data>) => {
        return func(acc, filterParams);
    }, initialData);
}