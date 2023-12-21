import {memoize} from "./memoize";

type CreateRegex = (a: string) => RegExp;
const createMemoRegex = memoize<CreateRegex>(
    (regexSource) => new RegExp(regexSource)
);

export { createMemoRegex };

