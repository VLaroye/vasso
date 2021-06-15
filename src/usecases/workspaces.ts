import { v4 as uuid } from 'uuid';
import workspacesService from "../services/workspaces";
import { db } from "../types/interfaces"
import Workspace from "../types/workspace";

const getWorkspace = async (db: db, id: string): Promise<Workspace | null> => {
    console.log('toto');
    
    const workspace = await workspacesService.getWorkspaceById(db, id);

    console.log('tata', workspace);
    
    if (!workspace) {
        const err = {
            name: 'NotFound',
            message: 'workspace not found',
        }

        throw err;
    }

    return workspace;
}

const createWorkspace = async (db: db, name:string): Promise<Workspace | null> => {
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

export default {
    getWorkspace,
    createWorkspace,
}