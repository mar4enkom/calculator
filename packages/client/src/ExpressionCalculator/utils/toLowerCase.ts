export function toLowerCase(inputString: string): string {
    return inputString.toLowerCase().replace(/infinity/g, 'Infinity');
}