import { mongoose } from 'mongoose'
import * as dotenv from 'dotenv' 
dotenv.config()

const URI = process.env.USER_URI

const connectDB = async () => {
  try {
    await mongoose.set('strictQuery', true)
    await mongoose.connect(URI, (err) => {
      console.log('base de datos Mongo conectada!');
    })
  } catch (err) {
    console.log(err.message)
  }
}

export default connectDB