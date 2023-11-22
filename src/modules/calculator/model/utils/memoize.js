export function memoize(fn) {
    const cachedValues = new Map();

    return function(...args) {
        const strArgs = args.join(" ");

        const cachedResult = cachedValues.get(strArgs);
        if(cachedResult !== undefined) {
            return cachedResult;
        }

        const newValue = fn(...args);
        cachedValues.set(strArgs, newValue);
        return newValue;
    }
}