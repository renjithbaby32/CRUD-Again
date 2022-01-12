import express from "express"
const app = express()
import connectDB from './config/db.js'
import User from './models/userModel.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

connectDB()

app.use(express.json())
app.use('/api', userRoutes)
app.use('/api/admin', adminRoutes)

app.use((req, res) => {
    throw new Error('Route does not exist')
})

app.use((err, req, res, next) => {
    res.status(404).json({
        message: err.message
    })
})

app.listen(5000, console.log('server 5000'))