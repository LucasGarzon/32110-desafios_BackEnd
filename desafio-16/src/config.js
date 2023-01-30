import dotenv from 'dotenv'
dotenv.config()

export default {
    app: {
        persistence: process.env.PERSISTENCE
    }
}