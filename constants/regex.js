export const Regex = {
    MOST_NESTED_PARENTHESES_INNER: /(?<=\()[^()]*?(?=\))/,
    MOST_NESTED_PARENTHESES: /\(([^()]*)\)/,
    FUNCTION_WITHOUT_SUB_FUNCTION: /[a-z]\w+\(([^()]*)\)/,
    FUNCTION_NAME: /[a-z]\w+(?=\(([^()]*)\))/,
    NUMBER: /-?\d+(\.\d+)?/,
    REGEX_RESERVED_SYMBOL: /^[+*?<>.]$/
}