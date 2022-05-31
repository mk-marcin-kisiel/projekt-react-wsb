import mongoose from 'mongoose';

const tagRelationSchema = new mongoose.Schema(
    {
    meme: {type: mongoose.Schema.Types.ObjectId, ref: 'meme'},
    tag: {type: mongoose.Schema.Types.ObjectId, ref: 'Tag'},
    }
)

const TagRelation = mongoose.model('tagRelation', tagRelationSchema)

export default TagRelation;