export const Operations = {
    FUNCTION: "function",
    CONSTANT: "constant",
    SIGN: "sign",
    OPERATOR: "operator",
}

export const OperationByPriority = {
    [Operations.CONSTANT]: 1,
    [Operations.SIGN]: 2,
    [Operations.FUNCTION]: 3,
    [Operations.OPERATOR]: 4,
}