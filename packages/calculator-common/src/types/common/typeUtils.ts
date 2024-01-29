export type Maybe<T> = T | null | undefined;
export type MaybeUndefined<T> = T | undefined;
export type ValueOf<T> = T[keyof T];
export type NonEmptyArray<T> = [T, ...T[]];
export type BaseObject = Record<string, any>;
export type BaseFunction = (...args: any) => any;

export function assert(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}
