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

const getChatMessages = async (req, res) => {
    try {
        const { candidateId } = req.params;
        const chat = await Chat.findOne({ candidate: candidateId });
        if (!chat) {
            return res.status(404).json({ error: 'Chat not found' });
        }
        const candidate = await User.findById(chat.candidate);
        const hr = await User.findById(chat.hr);
        res.status(200).json({chat, candidate, hr});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { saveChatMessage, getChatMessages };