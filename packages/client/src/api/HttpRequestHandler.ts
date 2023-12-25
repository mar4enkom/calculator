type EndpointParams = Record<string, string>;

export abstract class HttpRequestHandler {
    private apiBase: string;

    constructor(apiBase: string) {
        this.apiBase = apiBase;
    }

    private getEndpointParamsString = (params: EndpointParams) => {
        return Object.entries(params)
            .reduce((acc: string[], [key, value]) => [...acc, `${key}=${encodeURIComponent(value)}`], [])
            .join('&');
    }

    async get<T, P extends EndpointParams = any>(endpointBase: string, params: P): Promise<T> {
        const searchQuery = this.getEndpointParamsString(params);

        const endpoint = `${this.apiBase}${endpointBase}?${searchQuery}`;
        const res = await fetch(endpoint);
        if (!res.ok) {
            throw new Error(`Could not fetch ${endpoint}, received ${res.status}`);
        }
        return await (res.json() as Promise<T>);
    }

    async post<T, E, P extends EndpointParams = any>(endpoint: string, data: P): Promise<T> {
        const res = await fetch(`${this.apiBase}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        //TODO: don't throw, return object with error prop
        if (!res.ok) {
            throw res;
        }

        return res.json();
    }


    async put<T>(endpoint: string, data: unknown): Promise<T> {
        const res = await fetch(`${this.apiBase}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Could not update ${endpoint}, received ${res.status}`);
        }

        return res.json();
    }

    async delete<T>(endpoint: string): Promise<T> {
        const res = await fetch(`${this.apiBase}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Could not delete ${endpoint}, received ${res.status}`);
        }

        return res.json();
    }
}
