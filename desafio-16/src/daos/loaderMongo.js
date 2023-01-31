import mongoose from 'mongoose'
import * as dotenv from 'dotenv' 
dotenv.config()

const uri = process.env.USER_URI || "mongodb://localhost:27017/proyectoFinal"

export default async function startDB(){
  await mongoose.connect(uri, (err) => {
    if (err) return console.log('error al conectar a la base de datos')
    console.log('base de datos Mongo conectada!');
  })
}