const mongoose = require('mongoose');
// Schema for likes based on dynamic referencing for Post or Comment
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId //the unique id for each user ...
    },
    likedModel: {
        type: mongoose.Schema.ObjectId, //the unique id for either Post or Comment ..
        required: true,
        refPath: 'onModel' // tell mongoose to populate/choose the model, like belongs to dynamically..
    },// by refering to onModel
    onModel: {
        type: String,// contains the model name the like belongs to..
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;