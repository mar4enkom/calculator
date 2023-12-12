//export function compose<T extends BasicFunction = BasicFunction>(...functions: T[]): T {

// TODO: remove any
export function compose(...functions: any[]) {
    return function (...args: any[]) {
        return functions.reduce((result, func) => [func(...result)], args)[0];
    };
}