import ErrorHandler from "../errors/ErrorHandler";
import {ServerError} from "../errors/ServerError";
import {HttpStatusCodes} from "../constants/httpStatusCodes";
import {ServerErrorCodes} from "../constants/serverErrors";

export const handleUncaughtException = async (error: Error): Promise<void> => {
    console.error("Uncaught exception");
    const serverError = new ServerError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        ServerErrorCodes.UNKNOWN_SERVER_ERROR,
        "Uncaught exception",
        true
    );
    await ErrorHandler.handleError(serverError);
    process.exit(0);
};

export const handleUnhandledRejection = async (reason: Error): Promise<void> => {
    console.error("Unhandled rejection");
    const serverError = new ServerError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        ServerErrorCodes.UNKNOWN_SERVER_ERROR,
        "Unhandled rejection",
        true
    );
    ErrorHandler.handleError(serverError);
    process.exit(0);
};