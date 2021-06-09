import jwt from 'jsonwebtoken';
import { User } from "../../../types/user";

export const generateToken = (user: User): string => {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
        throw {
            name: 'BadRequest',
            message: 'auth token required'
        }
    }

    const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });

    return token;
}

interface DecodedToken {
    user: User,
}

export const decodeToken = async (token: string): Promise<DecodedToken> => {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
        throw {
            name: 'BadRequest',
            message: 'auth token required'
        }
    }

    const decoded: any = await jwt.verify(token, secretKey);

    return {
        user: decoded.user,
    }
}