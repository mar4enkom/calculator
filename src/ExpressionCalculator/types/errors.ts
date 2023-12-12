export type CustomErrorType<ErrorCode extends string = string> = {
    message: string;
    code: ErrorCode;
};