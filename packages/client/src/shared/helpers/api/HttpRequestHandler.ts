import {handleServerError} from "@/shared/utils/handleServerError";

type EndpointParams = Record<string, string>;

export class HttpRequestHandler {
    private apiBase: string;

    constructor(apiBase: string = process.env.API_BASE) {
        this.apiBase = apiBase;
    }

    async get<T>(endpoint: string, params: any): Promise<T> {
        const url = this.buildGetEndpointURL(endpoint, params);
        return await this.fetchApi(url);
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        const url = this.buildEndpointURL(endpoint);
        return await this.fetchApi(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }


    async put<T>(endpoint: string, data: unknown): Promise<T> {
        const url = this.buildEndpointURL(endpoint);
        return await this.fetchApi(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        const url = this.buildEndpointURL(endpoint);
        return await this.fetchApi(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    private buildEndpointURL(endpoint: string) {
        return `${this.apiBase}${endpoint}`;
    }

    private buildGetEndpointURL(endpoint: string, params: EndpointParams): string {
        let baseEndpointURL = this.buildEndpointURL(endpoint);

        if(params == null) return baseEndpointURL;

        const query = this.buildQueryParamsString(params);
        baseEndpointURL = baseEndpointURL.concat(query);

        return baseEndpointURL
    }

    private buildQueryParamsString(params: EndpointParams) {
        const queryParams = Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');

        return queryParams.length > 0 ? `?${queryParams}` : '';
    }

    private async fetchApi<T>(...fetchParams: Parameters<typeof fetch>): Promise<T> {
        const response = await fetch(...fetchParams);

        if (!response.ok) {
            const responseError = await response.json();
            const error = handleServerError(responseError);
            throw error;
        }

        return await response.json() as T;
    }
}
