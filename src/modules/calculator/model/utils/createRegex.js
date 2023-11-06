import {memoize} from "./memoize.js";

const createRegex = (regexSource) => new RegExp(regexSource);

const memoizedCreateRegex = memoize(createRegex);

export { memoizedCreateRegex as createRegex };

