import mongoose from 'mongoose';
import config from './config';
import { logger } from './utils/logger';

mongoose.connection.on('connected', () => {
    logger.info('Successfully conncted to database');
});
mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

if (config.SERVER.env === 'production') {
    mongoose.set('debug', false);
}
const connect: () => Promise<mongoose.Connection> = async () => {
    await mongoose.connect(config.DB.mongoURI as string, {
        keepAlive: true,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        autoIndex: false,
    });

    return mongoose.connection;
};
export default {
    connect,
};
