const mongoose = require("mongoose");

const commentShema = new mongoose.Schema(
    {
        clientId: {
            type: String,
            ref: 'User',
            required: true,
            default : 'guest'
        },
        content:{
            type: String,
            required: true
        },
        stars :{
            type  : Number ,
            min: 1 ,
            max: 5,
            default: 5
        },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date }
    },
    { timestamps: true }
);

const comment = mongoose.model("comment", commentShema);
module.exports = comment;
