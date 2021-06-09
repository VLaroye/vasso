import express from 'express';
import jwt from 'jsonwebtoken';
import { decodeToken, generateToken } from '../utils/jwt';

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
            return next();
        } catch(err) {
            return res.status(401).json('invalid token');
        }
    }

    return res.status(401).json('token required');
};
