import {Logger} from "./types";

export class DummyLogger implements Logger {
    async error(message: string, meta?: any): Promise<void> {
        await Promise.resolve(() => {
            console.error("Error happened".concat(message));
        });
    }

    async fatalError(message: string, meta?: any): Promise<void> {
        await Promise.resolve(() => {
            console.error("FATAL ERROR HAPPENED".concat(message));
        })
    }
}

