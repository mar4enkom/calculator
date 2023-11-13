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

    apply(targetFunction) {
        return (...args) => {
            try {
                for (const interceptor of this.interceptors) {
                    interceptor(...args);
                }
            } catch (e) {
                return e;
            }

            return targetFunction(...args)
        };
    }
}
