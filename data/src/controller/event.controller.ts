import { Request, Response } from 'express';
import Event from '../models/event.model';

export const addEvent = async (req: Request, res: Response) => {
    try {
        const { eventName, startDate, dueDate, description } = req.body;
        if (!eventName || !startDate || !dueDate) return res.status(400).json({ message: 'Required fields' });

        if (new Date(dueDate) < new Date(startDate)) {
            return res.status(400).send({ message: 'Due date cannot be before start date' });
        }

        const existingEvent = await Event.findOne({
            eventName,
            startDate: new Date(startDate),
            dueDate: new Date(dueDate),
        });
        if (existingEvent) {
            return res.status(409).send({ message: 'Event already exists' });
        }

        const event = new Event({
            eventName,
            startDate,
            dueDate,
            description,
        });

        const newEvent = await event.save();
        return res.status(201).send({
            message: 'Event added successfully',
            data: {
                event: newEvent,
            },
        });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { eventName, startDate, dueDate, description } = req.body;
        const eventId = req.query.eventId;

        if (!eventName || !startDate || !dueDate) return res.status(400).json({ message: 'Required fields' });

        if (new Date(dueDate) < new Date(startDate)) {
            return res.status(400).send({ message: 'Due date cannot be before start date' });
        }

        const event = await Event.findByIdAndUpdate(eventId, {
            eventName,
            startDate: new Date(startDate),
            dueDate: new Date(dueDate),
            description,
        });

        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }

        return res.send({ message: 'Event updated successfully' });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const editEvent = async (req: Request, res: Response) => {
    try {
        const { eventName, startDate, dueDate, description } = req.body;
        const eventId = req.query.eventId;

        if (!eventName || !startDate || !dueDate) return res.status(400).json({ message: 'Required fields' });

        if (new Date(dueDate) < new Date(startDate)) {
            return res.status(400).send({ message: 'Due date cannot be before start date' });
        }

        const event = await Event.findOne({ _id: eventId });
        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }

        event.eventName = eventName || event.eventName;
        event.startDate = startDate || event.startDate;
        event.dueDate = dueDate || event.dueDate;
        event.description = description || event.description;

        await event.save();
        return res.send({ message: 'Event updated successfully' });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const eventId = req.query.eventId;
        const event = await Event.findOne({ _id: eventId });

        if (!event) {
            return res.status(404).send({ message: 'Event not found' });
        }

        await Event.deleteOne({ _id: eventId });
        return res.status(200).send({ message: 'Event deleted successfully' });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
};

export const getAllEvent = async (req: Request, res: Response) => {
    try {
        const pageNumber: number = parseInt(req.query.pageNumber as string, 10);
        const skip: number = (pageNumber - 1) * 5;

        const events = await Event.find().sort('eventName').limit(5).skip(skip);

        return res.send({
            message: 'Events',
            data: {
                events
            },
        });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error' });
    }
};

