import mongoose from "mongoose"

const {Schema} = mongoose

const ChatSchema = new Schema({
  id: Schema.ObjectId,
  email: {type: String, require: true, max: 64},
  timestamp: {type: Date, default: Date.now},
  message: {type: String, require: true, max: 256}
})

export const chatSchema = mongoose.model('chat', ChatSchema)