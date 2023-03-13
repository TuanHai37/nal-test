import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { JwtSignOptions } from '../domain/interface';
dotenv.config();

let privateKey: string;
let publicKey: string;
loadJwtKey();

export const generateToken = (data: object, options: JwtSignOptions = {}) => {
    options = {
        algorithm: 'RS256',
        expiresIn: 60 * 60 * 24 * 30,
        ...options,
    };
    options.expiresIn = parseInt(options.expiresIn as string, 10);
    if (!options.expiresIn) delete options.expiresIn;
    const token = jwt.sign(data, privateKey, options);
    return token;
};

export const verifyToken = (token: string, options = {}) => {
    try {
        const verifiedData = jwt.verify(token, publicKey, options);
        return verifiedData;
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            throw new Error('TokenIsExpired');
        }
        throw new Error('TokenIsInvalid');
    }
};

function loadJwtKey() {
    try {
        privateKey = Buffer.from(`${process.env.JWT_PRIVATE_KEY}`, 'base64').toString('utf-8');
        publicKey = Buffer.from(`${process.env.JWT_PUBLIC_KEY}`, 'base64').toString('utf-8');
    } catch (err) {
        throw new Error('JWT_PRIVATE_KEY or JWT_PUBLIC_KEY is empty!');
    }
}
