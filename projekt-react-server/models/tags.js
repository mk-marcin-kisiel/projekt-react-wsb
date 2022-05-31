import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema(
    {
    tag: {type: String, required: true, unique: true},
    }
)

const tag = mongoose.model('Tag', tagSchema)

export default tag;