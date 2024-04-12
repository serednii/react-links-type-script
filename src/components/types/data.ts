export interface ITodo {
    id: number;
    title: string;
    complete: boolean;
}

export type SetLoading = (b: boolean) => void;
