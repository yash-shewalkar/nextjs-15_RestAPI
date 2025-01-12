import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {

    const connectionState = mongoose.connection.readyState

    if(connectionState === 1) {
        console.log('Database is already connected')
        return
    }
    if(connectionState === 2) {
        console.log('Database is connecting...')
        return
    }

    try {
        mongoose.connect(MONGODB_URI!, {

            dbName: 'next_API',
            bufferCommands:true,
        })
        console.log('Database connected')

    }
    catch(err: any) {
        console.log('Database connection failed: ', err);
        throw new Error('Database connection failed: ', err);
    }
}

export default connectDB; 