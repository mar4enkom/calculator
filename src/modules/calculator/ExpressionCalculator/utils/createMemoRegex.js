import {memoize} from "./memoize.js";

const createMemoRegex = memoize((regexSource) => new RegExp(regexSource));

export { createMemoRegex };

