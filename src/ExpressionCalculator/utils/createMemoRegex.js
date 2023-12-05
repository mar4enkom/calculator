import {memoize} from "CalculatorService/utils/memoize.js";

const createMemoRegex = memoize((regexSource) => new RegExp(regexSource));

export { createMemoRegex };

