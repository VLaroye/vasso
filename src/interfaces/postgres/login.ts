import { Pool } from "pg";
import { User, UserWithPassword } from "../../types/user";

export const getUserByUsername = async (dbClient: Pool, username: string): Promise<UserWithPassword | null> => {
    const query = {
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username],
    }

    try {
        const { rows, rowCount } = await dbClient.query(query);

        if (rowCount === 0) {
            return null;
        }

        const [{ id, username, password }] = rows;

        return {
            id,
            username,
            password,
        };
    } catch (err) {
        throw err;
    }
}

export const registerUser = async (dbClient: Pool, user: UserWithPassword): Promise<User | null> => {
    try {
        const { id, username, password } = user;

        // Create INSERT query
        const query = {
            text: 'INSERT INTO users(id, username, password) VALUES ($1, $2, $3) RETURNING *',
            values: [id, username, password],
        }
        // Execute query
        const { rows } = await dbClient.query(query);

        if (rows[0]) {
            const [{ id, username }] = rows;
        
            // Returns created user
            return { id, username }
        }

        return null;

    } catch (err) {
        throw err;
    }
}