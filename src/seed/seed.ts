import dotenv from 'dotenv';
import User from '../models/user.model';
import HashHelper from '../helpers/hash.helper';
import userJson from '../../data/user.json';
import eventJson from '../../data/event.json';
import Event from '../models/event.model';

dotenv.config();
import connectDB from '../config/database';

connectDB().then(async () => {
    await Event.deleteMany({});
    await Event.insertMany(eventJson);

    const hashPassword = await HashHelper.hash('password123');
    userJson.password = hashPassword;
    const userSeed = [
        userJson,
    ];

    const user = await User.findOne({ email: 'admin@gmail.com' });
    if (user) {
        console.log('done');
        return;
    }

    await User.create(userSeed);
    console.log('done');
}).catch(e => {
    console.log(e);
});
