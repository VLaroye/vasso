import { db } from '../types/interfaces';
import Workspace from '../types/workspace';

const getWorkspaceById = async (db: db, id: string): Promise<Workspace | null> => {
    return await db.workspaces.getWorkspaceById(db.dbClient, id);
}

const createWorkspace = async (db: db, workspace: Workspace): Promise<Workspace | null> => {
    return await db.workspaces.createWorkspace(db.dbClient, workspace);
}

export default {
    getWorkspaceById,
    createWorkspace
}