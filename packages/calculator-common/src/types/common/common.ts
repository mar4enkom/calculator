import {CalculateExpressionFunction} from "../modules/userConfig";

export type Validation<ErrorCode extends string = string> = {
    validate: (...args: Parameters<CalculateExpressionFunction>) => boolean;
    message: string;
    code: ErrorCode;
}
