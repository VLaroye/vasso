import express from 'express';
import { HTTP_STATUS } from '../../../types/http';

type ErrorResponse = {
    status: number;
    message: string;
    details?: string;
}

export const respondError = (res: express.Response, status: HTTP_STATUS, message: string, details: any) => {
    const response: ErrorResponse = {
        status,
        message,
        details,
    }

    res.status(status).json(response);
}