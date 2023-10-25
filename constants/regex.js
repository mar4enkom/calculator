export const Regex = {
    LARGEST_NESTING: /(?<=[^a-z0-9]|^)\(([^()]|[a-z]\w+\(([^()]*)\))*\)/,
    NESTING_WITHOUT_PARENTHESES: /\(([^()]*)\)/,
    NUMBER: /-?\d+(\.\d+)?/,
    REGEX_RESERVED_SYMBOL: /^[+*?<>.]$/
}