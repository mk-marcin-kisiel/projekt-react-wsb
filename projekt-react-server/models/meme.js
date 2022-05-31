import mongoose from 'mongoose';

const memeScheme = mongoose.Schema({
    title: String,
    creator: String,
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var Meme = mongoose.model('Meme', memeScheme);

export default Meme;