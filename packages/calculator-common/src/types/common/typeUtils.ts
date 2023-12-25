export type Maybe<T> = T | null | undefined;
export type ValueOf<T> = T[keyof T];
export function assert(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}
