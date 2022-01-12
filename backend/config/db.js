import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        const result = await mongoose.connect('mongodb://localhost:27017/usermanagement',
            {
                useUnifiedTopology: true,
                useNewUrlParser: true            })
        console.log(`MongoDB connected: ${result.connection.host}`)
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }

}

export default connectDB