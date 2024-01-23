import {CalculateExpressionFunction} from "../../modules/config/types";

export type Validation<ErrorCode extends string = string> = {
    validate: (...args: Parameters<CalculateExpressionFunction>) => boolean;
    message: string;
    code: ErrorCode;
}

export type BasePaginationParams = {
    sortBy?: string;
    pageNumber?: number;
    limit?: number;
} | undefined;

export enum MethodName {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete"
}
