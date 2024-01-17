export function throttle<T>(func: (...args: T[]) => void, delay: number): (...args: T[]) => void {
    let lastCallTime = 0;

    return function (...args: any[]): void {
        const currentTime = Date.now();

        if (currentTime - lastCallTime >= delay) {
            func(...args);
            lastCallTime = currentTime;
        }
    };
}
