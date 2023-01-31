import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
      },
      email: { 
        type: String, 
        required: true, 
        unique: true 
      },
      first_name: { 
        type: String, 
        required: true, 
      },
      last_name: { 
        type: String, 
        required: true, 
      },
      password: { 
        type: String, 
        required: true 
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
})

const userModel = mongoose.model('user', userSchema)
export default userModel
