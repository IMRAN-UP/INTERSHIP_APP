const mongoose = require("mongoose");

const vehicleShema = new mongoose.Schema(
    {
        clientId: {
            type: String,
            ref: 'User',
            required: true
        },
        ownerName :{
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ["car", "tractor", "bicycle" , "truck"]
        },
        name: {
            type: String,
            required: true
        },
        color  : {
            type: String,
            required: true,
            enum: ["red", "blue", "green", "yellow", "black" , "white" , "grey" , "gold" , "silver" ]
        },
        model: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true,
            min: 1886,
            max: new Date().getFullYear() + 1
        },
        licensePlate : {
            type: String,
            required: true,
            unique: true,
            match: /^[A-Z0-9]{3}-[A-Z0-9]{3}$/i,
            message: "License plate format is incorrect (e.g. ABC-123)"
        },
        seats : {
            type: Number,
            required: true,
            min: 2,
            max: 10
        },
        fuelType: {
            type: String,
            required: true,
            enum: ["gasoline", "diesel", "electric"]
        } ,
        assured : {
            type: Boolean ,
            default: false 
        } ,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date }
    },
    { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", vehicleShema);
module.exports = Vehicle;
