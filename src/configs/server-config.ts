import dotenv from 'dotenv'
import { env } from '../interfaces/configInterface'

dotenv.config()

export const ENV:env = {
    PORT: process.env.PORT!,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY!,
    MONGO_URI: process.env.MONGO_URI!
}
