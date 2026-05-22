export enum Status {
    success = 'success',
    error = 'error',
}

export type DataStatus<T> = {
    status: Status;
    data?: T;
    error?: string;
};