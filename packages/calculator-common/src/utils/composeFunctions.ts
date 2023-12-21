type AnyUnaryFunction = (arg: any) => any;

export function compose<T extends AnyUnaryFunction>(...functions: T[]): T {
    return function (input: Parameters<T>): ReturnType<T> {
        return functions.reduce((acc, fn) => fn(acc), input) as ReturnType<T>;
    } as T;
}

