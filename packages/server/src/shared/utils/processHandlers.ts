import ErrorHandler from "../errors/ErrorHandler";

export const handleUncaughtException = async (error: Error): Promise<void> => {
    ErrorHandler.handleError(error);
};

export const handleUnhandledRejection = async (reason: any): Promise<void> => {
    ErrorHandler.handleError(reason);
};