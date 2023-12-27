import {BasicFunction} from "../utils/types";

type InterceptorFunction<T extends BasicFunction> = (...args: Parameters<T>) => void;
type FunctionWithInterceptors<T extends BasicFunction = BasicFunction> =
    (...args: Parameters<T>) => ReturnType<T>;

export class Interceptor<T extends BasicFunction = BasicFunction> {
    private interceptors: InterceptorFunction<T>[];

    constructor() {
        this.interceptors = [];
    }

    add(interceptor: InterceptorFunction<T>): void {
        this.interceptors.push(interceptor);
    }

    remove(interceptor: InterceptorFunction<T>): void {
        this.interceptors = this.interceptors.filter((item) => item !== interceptor);
    }

    applyInterceptor(targetFunction: FunctionWithInterceptors<T>): FunctionWithInterceptors<T> {
        return (...args: Parameters<BasicFunction>) => {
            for (const interceptor of this.interceptors) {
                interceptor(...args);
            }
            return targetFunction(...args);
        };
    }
}
