const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    role: {
        type: String,
        enum: ['candidate', 'hr'],
        required: true
    }
});

const chatSchema = new mongoose.Schema({
    candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hr: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [messageSchema]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
