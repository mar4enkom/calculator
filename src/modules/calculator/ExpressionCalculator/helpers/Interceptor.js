export class Interceptor {
    constructor(targetFunction) {
        this.interceptors = [];
    }

    add(interceptor) {
        this.interceptors.push(interceptor);
    }

    remove(interceptor) {
        this.interceptors = this.interceptors.filter((item) => item !== interceptor);
    }

    applyInterceptor(targetFunction) {
        return (...args) => {
            for (const interceptor of this.interceptors) {
                interceptor(...args);
            }
            return targetFunction(...args)
        };
    }
}
