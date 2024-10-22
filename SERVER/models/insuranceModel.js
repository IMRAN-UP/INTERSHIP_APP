const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
    policyNumber: {
        type: Number,
        unique: true,
    },
    clientId: {
        type: String,
        ref: 'User',
        required: true,
    },
    ownerName: {
        type: String,
        required: true,
    } ,
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true,
    },
    fire: {
        type: Boolean,
        default: false,
        required: true,
    },
    theft: {
        type: Boolean,
        default: false,
        required: true,
    },
    glass: {
        type: Boolean,
        default: false,
        required: true,
    },
    roadsideAssistance: {
        type: String,
        default: false,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0;
            },
            message: 'Price must be a positive number.',
        }
    },
    usageType: {
        type: String,
        enum: ['familial', 'commercial', 'auther'],
        required: true,
    },
    liability: {
        type: Boolean,
        default: true,
        required: true,
    },
    collision: {
        type: Boolean,
        default: false,
        required: true,
    },
    comprehensive: {
        type: Boolean,
        default: false,
        required: true,
    },
    personalInjury: {
        type: Boolean,
        default: false,
        required: true,
    },
    uninsuredMotorist: {
        type: Boolean,
        default: false,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value > 0 && [1, 3, 6, 12].includes(value);
            },
            message: 'Duration must be either 1, 3, 6 months, or 1 year.',
        }
    },
    status: {
        type: String,
        enum: ['active', 'in card', 'ended'],
        required: true,
    },
    expirationDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

insuranceSchema.pre("save", function (next) {
    const currentDate = new Date();
    this.expirationDate = new Date(currentDate.setMonth(currentDate.getMonth() + this.duration));

    if (!this.policyNumber) {
        this.constructor.findOne().sort({ createdAt: -1 }).then(lastInsurance => {
            const currentYear = new Date().getFullYear();
            let nextNumber = 1;

            if (lastInsurance && lastInsurance.policyNumber) {
                const lastNumberStr = String(lastInsurance.policyNumber);
                const lastNumber = parseInt(lastNumberStr.slice(-5));
                nextNumber = lastNumber + 1;
            }

            const uniqueNumber = String(nextNumber).padStart(5, '0');
            this.policyNumber = `313${currentYear}1${uniqueNumber}`;
            next();
        });
    } else {
        next();
    }
});

insuranceSchema.methods.checkExpiration = function() {
    if (new Date() >= this.expirationDate && this.status === 'active') {
        this.status = 'ended';
        this.save();
    }
};

module.exports = mongoose.model('Insurance', insuranceSchema);
