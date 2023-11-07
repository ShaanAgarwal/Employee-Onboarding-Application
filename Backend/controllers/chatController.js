const express = require("express");
const User = require('../models/userSchema');
const Chat = require('../models/chatSchema');

const saveChatMessage = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const { text, role } = req.body;
        let chat = await Chat.findOne({ candidate: candidateId });
        chat.messages.push({ text, role });
        await chat.save();
        res.status(201).json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {saveChatMessage};