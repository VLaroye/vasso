import { Application } from "express";
import { db } from "../../../types/interfaces";
import authenticated from "../middlewares/authenticated";
import { createWorkspace, getWorkspace, listWorkspaces } from "./controller";

export const defineRoutes = (server: Application, db: db) => {
    server.get('/workspaces', authenticated, listWorkspaces(db));
    server.get('/workspaces/:id', authenticated, getWorkspace(db));
    server.post('/workspaces', authenticated, createWorkspace(db));
}