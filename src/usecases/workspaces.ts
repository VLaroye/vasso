import { v4 as uuid } from 'uuid';
import workspacesService from "../services/workspaces";
import { db } from "../types/interfaces"
import Workspace from "../types/workspace";

const getWorkspace = async (db: db, id: string): Promise<Workspace | null> => {
    // TODO: Check if user has access to this workspace
     
    const workspace = await workspacesService.getWorkspaceById(db, id);
    
    if (!workspace) {
        const err = {
            name: 'NotFound',
            message: 'workspace not found',
        }

        throw err;
    }

    return workspace;
}

const createWorkspace = async (db: db, name: string): Promise<Workspace | null> => {
    const id = uuid();

    const workspaceToCreate: Workspace = { id, name };

    const createdWorkspace = await workspacesService.createWorkspace(db, workspaceToCreate)
    
    if (!createdWorkspace) {
        const err = {
            name: 'DBError',
            message: 'error creating workspace',
        }

        throw err;
    }

    return createdWorkspace;
}

const listWorkspaces = async (db: db, userId: string): Promise<Workspace[]> => {
    const workspaces = await workspacesService.listWorkspaces(db, userId);

    return workspaces;
}

export default {
    getWorkspace,
    createWorkspace,
    listWorkspaces,
}