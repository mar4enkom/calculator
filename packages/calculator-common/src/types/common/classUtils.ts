export interface Singleton<T> {
    new(...args: any[]): any;
    getInstance(): T;
}