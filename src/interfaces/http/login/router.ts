import { Application } from 'express';
import { db } from '../../../types/interfaces';
import { login, register } from './controller';

export const defineRoutes = (server: Application, db: db) => {
    server.post('/login', login(db));
    server.post('/register', register(db));
}