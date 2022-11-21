import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('user', userSchema)
export default userModel