import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import './db.js';
import errorHandler from './middleware/error.js';
import { AdminRouter } from './routes/auth.js';
import { UserRouter } from './routes/user.js';
import { JobTypeRouter } from './routes/jobtype.js';
import { JobRouter } from './routes/jobs.js';





const app = express();
app.use(express.json())
dotenv.config();
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin : ['http://localhost:5173'],
    credentials : true
}))

app.use(errorHandler);


app.use('/auth', AdminRouter)
app.use('/auth', UserRouter)
app.use('/auth',JobTypeRouter)
app.use('/auth',JobRouter)






app.listen(process.env.PORT, () => {
    console.log("server is running");
})