import type {AxiosInstance, AxiosRequestHeaders} from "axios";
import axios from "axios";

export abstract class Service {

    protected abstract path: string

    protected httpClient: AxiosInstance;

    public headers: AxiosRequestHeaders;

    constructor() {
        this.httpClient = axios.create()

        this.httpClient.interceptors.request.use((config) => {

            if (this.headers) {
                config.headers = this.headers;
            }

            return config
        });
    }

    // addHeader(key: string, value: string) {
    //     if (!this.headers) {
    //         this.headers = {}
    //     }
    // }

    protected host(
        queryStringObject?: { [key: string]: any })
    {
        let queryString = '';

        if (queryStringObject && Object.keys(queryStringObject).length) {
            queryString = '?' + Object.keys(queryStringObject)
                .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryStringObject[key])}`)
                .join('&');
        }

        return process.env.API_HOST + this.path +  queryString;
    }
    public get<LIST>(queryStringObject?: { [key: string]: any }, id?: number): Promise<{ data: Array<LIST> }> {

        let host = this.host(queryStringObject)

        if (id) {
            host += `/${id}`;
        }

        return this.httpClient.get(
            host
        );
    }

    public post<T>(data: T) {
        let host = this.host();

        return this.httpClient.post(
            host,
            data
        );
    }

    public put<T>(id: any, data: T) {
        let host = this.host() + '/' +id;

        return this.httpClient.put(
            host,
            data
        );
    }

    public delete(id: number) {
        return this.httpClient.delete(
            this.host() + '/' + id
        )
    }
}