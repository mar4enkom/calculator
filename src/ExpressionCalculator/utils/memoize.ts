type BasicFunction = (...args: any[]) => any;

export function memoize<T extends BasicFunction>(func: T): T {
    const cachedValues = new Map<string, ReturnType<T>>();

    return function(...args: Parameters<T>): ReturnType<T> {
        const strArgs = args.join(" ");

        const cachedResult = cachedValues.get(strArgs);
        if(cachedResult !== undefined) {
            return cachedResult;
        }

        const newValue = func(...args);
        cachedValues.set(strArgs, newValue);
        return newValue;
    } as T;
}