import {Logger} from "./logger/types";
import {DummyLogger} from "./logger/DummyLogger";
import {BaseServerError} from "./BaseServerError";

class ErrorHandler {
    private logger: Logger;
    constructor(logger: Logger) {
        this.logger = logger;
    }
    public async handleError(error: Error, responseStream?: Response): Promise<void> {
        await this.logger.error(error.message);
    }

    public isCriticalError(error: Error): boolean {
        if(error instanceof BaseServerError) {
            return error.isCritical;
        }
        return false;
    }
}

export const errorHandler = new ErrorHandler(new DummyLogger());