import express from 'express';
import loginUsecase from '../../../usecases/login';
import { HTTP_STATUS } from '../../../types/http';
import { loginRequestSchema, registerRequestSchema } from '../../../schemas/login';
import { respondError } from '../utils/respond';
import { db } from '../../../types/interfaces';

export const login = (db: db) => {
  return (async (req: express.Request, res: express.Response) => {
    try {
      const { body, headers } = req;
      
      const { error, value } = loginRequestSchema.validate(body);
      
      if (error) {
        respondError(res, HTTP_STATUS.BAD_REQUEST, 'validation error', error.details );
        return;
      }
      
      const { token, user } = await loginUsecase.login(db, body.username, body.password);
      
      res.header('Authorization', 'Bearer ' + token);
      res.status(HTTP_STATUS.OK).json({ status: HTTP_STATUS.OK, user });
    } catch (err) {
      respondError(res, HTTP_STATUS.SERVER_ERROR, 'unable to login', null);         
    }        
  });
}

export const register = (db: db) => {
  return (async (req: express.Request, res: express.Response) => {
    try {
      const { body } = req;

      const { error, value } = registerRequestSchema.validate(body);      
      
      if (error) {
        respondError(res, HTTP_STATUS.BAD_REQUEST, 'validation error', error.details );
        return;
      }

      const user = await loginUsecase.register(db, body.username, body.password);

      if (user)

      res.status(HTTP_STATUS.OK).json({ user });
    } catch (err) {
      if (err.name === 'AlreadyExists') {
        respondError(res, HTTP_STATUS.SERVER_ERROR, err.message, null);
        return;
      }
      respondError(res, HTTP_STATUS.SERVER_ERROR, 'unable to register', null);
    }
  });
}