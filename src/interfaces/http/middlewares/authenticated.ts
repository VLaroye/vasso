import express from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from '../../../types/http';
import { decodeToken, generateToken } from '../utils/jwt';
import { respondError } from '../utils/respond';

export default async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let token = req.header('authorization');
    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        try {
            const decodedToken = await decodeToken(token);            
            
            const newToken  = generateToken(decodedToken.user);

            res.header('Authorization', 'Bearer ' + newToken);

            console.log(decodedToken.user.id);
            
            req.headers['user-id'] = decodedToken.user.id;
            return next();
        } catch(err) {
            return respondError(res, HTTP_STATUS.UNAUTHORIZED, 'invalid auth token', null);
        }
    }

    return respondError(res, HTTP_STATUS.UNAUTHORIZED, 'auth token required', null);
};
