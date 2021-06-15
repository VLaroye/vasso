import express from 'express';
import { HTTP_STATUS } from '../../../types/http';
import { db } from '../../../types/interfaces';
import workspaceUsecase from '../../../usecases/workspaces';
import { createWorkspaceRequestSchema } from '../schemas/workspaces';
import { respondError } from '../utils/respond';

export const listWorkspaces = (db: db) => {
  return (async (req: express.Request, res: express.Response) => {
    res.json('list workspaces')
  });
}

export const getWorkspace = (db: db) => {
  return (async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;

      const workspace = await workspaceUsecase.getWorkspace(db, id);
      console.log('toto', workspace);
      

      if (!workspace) {
        respondError(res, HTTP_STATUS.NOT_FOUND, 'workspace not found', null);
        return;
      }

      res.status(HTTP_STATUS.OK).json({ status: HTTP_STATUS.OK,workspace });
    } catch (err) {
      console.log(err);
      
      respondError(res, HTTP_STATUS.SERVER_ERROR, 'unable get workspace', null);    
    }
  });
}

export const createWorkspace = (db: db) => {
  return (async (req: express.Request, res: express.Response) => {
    try {
      // GET params from request body (workspace name)
      const { body } = req;
      // Validate request
      const { error, value } = createWorkspaceRequestSchema.validate(body);
      
      if (error) {
        respondError(res, HTTP_STATUS.BAD_REQUEST, 'validation error', error.details );
        return;
      }
      // Call usecase
      const workspace = await workspaceUsecase.createWorkspace(db, body.name);
      
      // respond (ok -> workspace created. not ok -> error)
      res.status(HTTP_STATUS.OK).json({ status: HTTP_STATUS.OK, workspace });
    } catch (err) {
      console.log(err);

      respondError(res, HTTP_STATUS.SERVER_ERROR, 'unable to create workspace', null);
    }
  });
}