type EndpointParams = Record<string, string>;

export class HttpRequestService {
    private static apiBase: string = process.env.API_BASE;

    private static getEndpointParamsString = (params: EndpointParams) => {
        return Object.entries(params)
            .reduce((acc: string[], [key, value]) => [...acc, `${key}=${encodeURIComponent(value)}`], [])
            .join('&');
    }

    static async get<T, P extends EndpointParams = any>(endpointBase: string, params: P): Promise<T> {
        const searchQuery = this.getEndpointParamsString(params);

        const endpoint = `${HttpRequestService.apiBase}${endpointBase}?${searchQuery}`;
        const res = await fetch(endpoint);
        if (!res.ok) {
            throw new Error(`Could not fetch ${endpoint}, received ${res.status}`);
        }
        return await (res.json() as Promise<T>);
    }

    static async post (endpoint: string, data: unknown) {
        const res = await fetch(`${HttpRequestService.apiBase}${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${endpoint}, received ${res.status}`);
        }

        return res.json();
    };
}
