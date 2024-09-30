export interface Logger {
    error(message: string, meta?: any): Promise<void>;
    fatalError(message: string, meta?: any): Promise<void>;
}