export function toNumberArray(stringArr: Array<string | number>): number[] {
    return stringArr.map((item) => Number(item))
}