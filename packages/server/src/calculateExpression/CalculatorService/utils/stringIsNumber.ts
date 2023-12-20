export function stringIsNumber(str: string | number): boolean {
    return !Number.isNaN(+str);
}