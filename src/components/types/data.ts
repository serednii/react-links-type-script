
export interface ITodo {
    id: number;
    title: string;
    complete: boolean;
}

type TSetLoading = (b: boolean) => void;

export type TGetData = (url: string, setIsLoading: TSetLoading) => any;
export type TOutDataServer = (url: string, method: 'PUT' | 'POP' | 'PUSH' | 'PATCH' | 'DELETE', newData: any) => any;


export interface IRequestOptions {
    method: 'PUT' | 'POP' | 'PUSH' | 'PATCH' | 'DELETE',
    mode?: 'cors' | 'no-cors' | 'same-origin', // no-cors, *cors, same-origin
    cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached' | undefined;
    credentials?: 'same-origin' | 'include' | 'omit';
    headers?: IHeaders,
    body?: string,
}

interface IHeaders {
    [key: string]: string;
}