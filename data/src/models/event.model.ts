import { Schema, model } from 'mongoose';
import { IEvent } from '../domain/interface';

const eventSchema = new Schema<IEvent>({
    eventName: { type: String, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Event = model<IEvent>('Event', eventSchema);

export default Event;
