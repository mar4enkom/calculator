import ErrorHandler from "../errors/ErrorHandler";

export const handleUncaughtException = async (error: Error): Promise<void> => {
    console.error("Uncaught exception");
    ErrorHandler.handleError(error);
};

export const handleUnhandledRejection = async (reason: Error): Promise<void> => {
    console.error("Unhandled rejection");
    ErrorHandler.handleError(reason);
};