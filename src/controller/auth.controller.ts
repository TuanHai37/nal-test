import { Request, Response } from 'express';
import { generateToken } from '../helpers/jwt.helper';
import hashHelper from '../helpers/hash.helper';
import ValidationHelper from '../helpers/validation.helper';
import User from '../models/user.model';

export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ message: '`Email` + `Password` are required fields' });
            console.log('aaaaaaaaaaas')
        const isValidEmail = ValidationHelper.validateEmail(email);
        if (!isValidEmail) return res.status(400).send({ message: 'Email is invalid' });

        const isValidPassword = ValidationHelper.validatePassword(password);
        if (!isValidPassword) return res.status(400).send({ message: 'Password is invalid' });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).send({ message: 'Email do not match' });

        const isPassword = await hashHelper.verifyPassword(password, user.password);
        if (!isPassword) return res.status(401).send({ message: 'Password do not match' });

        const expiresIn = 60 * 60;
        const responseUser = {
            username: user.username,
            id: user.id,
            email: user.email,
        };

        const accessToken = await generateToken(responseUser, { expiresIn });
        const refreshToken = await generateToken(responseUser);

        return res.send({
            message: 'Login successful',
            data: {
                user: responseUser,
                token: accessToken,
                refreshToken: refreshToken,
            },
        });
    } catch (e) {
        return res.status(500).send({ message: 'Internal Server Error' });
    }
}