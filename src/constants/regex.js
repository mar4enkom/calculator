
export const Regex = {
    LARGEST_NESTING/*find largest nesting inside parentheses, not including functions */:
        /(?<=[^a-z0-9!]|^)\(([^()]|[a-z]\w+\(([^()]*)\))*\)(?=([^a-z0-9!])|$)/,
    NESTING_WITHOUT_PARENTHESES: /\(([^()]*)\)/,
    NUMBER: /-?\d+(\.\d+)?/,
    REGEX_RESERVED_SYMBOL: /^[+*?<>.^!|$(){}-]$/
}