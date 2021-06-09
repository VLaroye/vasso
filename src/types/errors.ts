export interface NotFoundError extends Error {
    name: 'NotFound';
    message: string;
}