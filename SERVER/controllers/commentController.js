const Comment = require('../models/commentsModel');

const createComment = async (req, res) => {
    const { clientId, content , stars } = req.body;

    if (!content) {
        return res.status(400).json({ message: "Comments must have a content are required" });
    }

    try {
        const newComment = new Comment({ clientId, content , stars });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findComment = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createComment, findComment };
