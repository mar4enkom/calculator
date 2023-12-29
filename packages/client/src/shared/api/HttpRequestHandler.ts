import {HttpQueryResult} from "./types";

type EndpointParams = Record<string, string>;

export abstract class HttpRequestHandler {
    private apiBase: string;

    constructor(apiBase: string) {
        this.apiBase = apiBase;
    }

    async get<T, E, P extends EndpointParams = any>(endpointBase: string, params: P): Promise<HttpQueryResult<T, E>> {
        const searchQuery = this.getEndpointParamsString(params);

        const endpoint = `${this.apiBase}${endpointBase}?${searchQuery}`;
        return await this.fetchApi(endpoint);
    }

    async post<T, E, P extends EndpointParams = any>(endpoint: string, data: P): Promise<HttpQueryResult<T, E>> {
        return await this.fetchApi(`${this.apiBase}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }


    async put<T, E>(endpoint: string, data: unknown): Promise<HttpQueryResult<T, E>> {
        return await this.fetchApi(`${this.apiBase}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    async delete<T, E>(endpoint: string): Promise<HttpQueryResult<T, E>> {
        return await this.fetchApi(`${this.apiBase}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    private getEndpointParamsString(params: EndpointParams) {
        if(params == null) return "";
        return Object.entries(params)
            .reduce((acc: string[], [key, value]) => [...acc, `${key}=${encodeURIComponent(value)}`], [])
            .join('&');
    }

    private async fetchApi<T, E>(...fetchParams: Parameters<typeof fetch>): Promise<HttpQueryResult<T, E>> {
        const response = await fetch(...fetchParams);

        if (!response.ok) {
            return {
                data: undefined,
                errors: await response.json() as E,
            };
        }

        return {
            data: await response.json() as T,
            errors: undefined,
        };
    }
}
