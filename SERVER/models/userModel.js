const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                return value <= new Date();
            },
            message: 'Birthday must be in the past.',
        },
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female'],
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        trim: true,
        lowercase: true
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true, // Ensure phone_number is unique
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return (
                    value.length >= 8 &&
                    /[A-Z]/.test(value) &&
                    /[a-z]/.test(value) &&
                    /[0-9]/.test(value) &&
                    /[\W_]/.test(value)
                );
            },
            message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;