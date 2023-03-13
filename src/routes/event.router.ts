import express from 'express';
import authMiddleware from '../middleware/auth.middleware';
import { addEvent, updateEvent, deleteEvent, editEvent, getAllEvent } from '../controller/event.controller';

const router = express.Router();

router.post('/add-event', authMiddleware, addEvent);

router.put('/edit-event', authMiddleware, editEvent);

router.put('/update-event', authMiddleware, updateEvent);

router.post('/delete-event', authMiddleware, deleteEvent);

router.get('/get-all-events', authMiddleware, getAllEvent);

export default router;
