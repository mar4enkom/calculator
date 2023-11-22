export function getFirstMatch(regex, input, groupName) {
    const result = regex.exec(input);
    return groupName ? result?.groups?.[groupName] : result?.[0];
}