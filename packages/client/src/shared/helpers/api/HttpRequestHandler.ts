import {handleServerError} from "@/shared/utils/handleServerError";

type EndpointParams = Record<string, string>;

export class HttpRequestHandler {
    private apiBase: string;

    constructor(apiBase: string = process.env.API_BASE) {
        this.apiBase = apiBase;
    }

    async get<T>(endpointBase: string, params: any): Promise<T> {
        const searchQuery = this.getEndpointParamsString(params);

        const endpoint = `${this.apiBase}${endpointBase}?${searchQuery}`;
        return await this.fetchApi(endpoint);
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        return await this.fetchApi(`${this.apiBase}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }


    async put<T>(endpoint: string, data: unknown): Promise<T> {
        return await this.fetchApi(`${this.apiBase}${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
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
