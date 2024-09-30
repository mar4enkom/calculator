import {NonEmptyArray} from "../../../types/common/typeUtils";
import {User} from "../types";

export const userSortByKeyNames = ((): NonEmptyArray<keyof User> => {
    const sortByPossibleValues: Record<keyof User, undefined> = {
        id: undefined,
        password: undefined,
        email: undefined,
        username: undefined,
    }
    return Object.keys(sortByPossibleValues) as NonEmptyArray<keyof User>;
})()