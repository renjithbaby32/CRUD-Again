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



app.listen(5000, console.log('server 5000'))