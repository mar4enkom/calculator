export function getFirstMatch(regex: RegExp, input: string, groupName?: string): string | undefined {
    const result = regex.exec(input);
    return groupName ? result?.groups?.[groupName] : result?.[0];
}