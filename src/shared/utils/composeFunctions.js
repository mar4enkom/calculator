export function compose(...functions) {
    return function (...args) {
        return functions.reduce((result, func) => [func(...result)], args)[0];
    };
}