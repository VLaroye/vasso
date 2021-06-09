import { compare, hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { getUserByUsername, registerUser } from "../services/login";
import { User, UserWithPassword } from '../types/user';
import { db } from '../types/interfaces';
import { generateToken } from '../interfaces/http/utils/jwt';

const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await hash(password, 10)
    return hashedPassword;
}

const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
    const isPasswordMatching = await compare(password, hashedPassword);
    
    return isPasswordMatching;
}

const login = async (db: db, username: string, password: string): Promise<any> => {
    // Get user from db
    const user = await getUserByUsername(db, username);

    if (!user) {
        const err = {
            name: 'NotFound',
            message: 'user not found',
        }

        throw err;
    }

    // Compare passwords
    const arePasswordsMatching = await comparePasswords(password, user.password);

    if (!arePasswordsMatching) {        
        const err = {
            name: 'BadRequest',
            message: 'wrong password',
        }

        throw err;
    }    

    const token = generateToken(user);

    return { token, user };
}

const register = async (db: db, username: string, password: string) => {
    // Check if username already exists
    const existingUser = await getUserByUsername(db, username);

    if (existingUser) {
        const error = {
            name: 'AlreadyExists',
            message: 'user already exists',
        };

        throw error;
    }

    const hashedPassword = await hashPassword(password);
    
    const id = uuid();

    const userToRegister: UserWithPassword = {
        id,
        username: username,
        password: hashedPassword,
    }

    const registeredUser = await registerUser(db, userToRegister);

    return registeredUser;
}

export default {
    login,
    register,
}