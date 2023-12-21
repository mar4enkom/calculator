export type CustomErrorType<T extends string = string> = {
    message: string;
    code: T;
};
export type ErrorMap<T extends string> = Record<T, CustomErrorType<T>>