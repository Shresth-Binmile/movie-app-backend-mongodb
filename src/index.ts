import express, {Request, Response} from 'express'
import cookieParser from 'cookie-parser'
import router from './routes/v1/route'
import { ENV } from './configs/server-config'
import {StatusCodes} from 'http-status-codes'
import main from './utils/connectDB'
import messages from './utils/messages'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1', router)
app.use(cors({
    origin: ['http://localhost:5173', 'https://movie-explorer-pi.vercel.app/#'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}))

app.get('/', (req:Request, res:Response)=>{
    try {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: true,
            message: messages.WELCOME,
            error: {},
            data: {}
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.PROBLEM_IN_FETCH,
            error: error,
            data: {}
        })
    }
})

app.listen(ENV.PORT, async () => {
    try {
        await main()
        console.log(`Server is listening on port no: ${ENV.PORT}. Connection has been established successfully.`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})