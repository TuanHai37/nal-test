import express from 'express';
import { signUp } from '../controller/auth.controller';

const router = express.Router();

router.post('/sign-in', signUp);

export default router;
