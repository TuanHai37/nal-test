import { SignOptions } from 'jsonwebtoken';
import { Request} from 'express'

export interface IEvent {
    eventName: string;
    startDate: Date;
    dueDate: Date;
    description: string;
    createdAt: Date;
}

export interface IUser {
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserLogin {
    email: string;
    username: string;
    id: string;
}

export interface IRequest extends Request {
    user?: IUserLogin;
}

export interface JwtSignOptions extends SignOptions {
    expiresIn?: string | number;
}