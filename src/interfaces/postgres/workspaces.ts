import { Pool } from "pg";
import Workspace from "../../types/workspace";

export const getWorkspaceById = async (dbClient: Pool, id: string): Promise<Workspace | null> => {    
    const query = {
        text: 'SELECT * FROM workspaces WHERE id = $1',
        values: [id],
    }    

    const result = await dbClient.query(query);
    
    if (result.rows[0]) {
        const [{ id, name }] = result.rows;
    
        return { id, name }
    }

    return null;
}

export const createWorkspace = async (dbClient: Pool, workspace: Workspace): Promise<Workspace | null> => {
    const query = {
        text: 'INSERT INTO workspaces(id, name) VALUES ($1, $2) RETURNING *',
        values: [workspace.id, workspace.name],
    }

    const { rows } = await dbClient.query(query);

    if (rows[0]) {
        const [{ id, name }] = rows;    
    
        return { id, name };
    }

    return null;
}

export const listWorkspaces = async (dbClient: Pool, userId: string): Promise<Workspace[]> => {
    const query = {
        text: `
          SELECT ws.*
          FROM workspaces ws
          JOIN workspace_membership wsmb ON ws.id = wsmb.workspace_id
          JOIN users u ON wsmb.user_id = u.id
          WHERE u.id = $1`,
        values: [userId],
    }    

    const { rows } = await dbClient.query(query);
    
    return rows;
}