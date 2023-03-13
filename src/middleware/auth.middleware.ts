import { Response, NextFunction } from 'express';
import { verifyToken } from '../helpers/jwt.helper';
import User from '../models/user.model';
import { IUserLogin, IRequest } from '../domain/interface';

const authMiddleware = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers && req.headers['authorization'] as string;
        const token = authHeader ? authHeader.replace('Bearer ', '') : '';

        const decoded = verifyToken(token) as IUserLogin;

        const userId = decoded?.id;

        const user = await User.findOne({ _id: userId });
        if (!user) return res.status(401).send({ error: 'Not authorized to access this resource' });

        req.user = {
            email: user?.email,
            username: user?.username,
            id: user?.id,
        };

        next();
    } catch (err) {
        return res.status(401).send({ error: 'Not authorized to access this resource' });
    }
};

export default authMiddleware;
