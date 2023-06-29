const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    message:{
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true
    },
    chatroom: {
        type: String,
        required: true
    }
},{
    timestamps:{
        type: Number,
        default: Date.now()
    }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;