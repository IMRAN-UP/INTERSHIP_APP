const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    insuranceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Insurance',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isFinite,
        message: 'Amount must be a number'
      }
    },
    paymentMethod: {
      type: String,
      enum: ['masterCard', 'paypal', 'visa', 'cash'],
      required: true
    },
    paymentDate: {
      type: Date,
      required: true,
      default: Date.now
    },
    cardDetails: {
      cardNumber: {
        type: String,
        trim: true,
        minlength: 13,
        maxlength: 19,
        validate: {
          validator: function (v) {
            return /^[0-9]{13,19}$/.test(v);
          },
          message: 'Invalid card number'
        }
      },
      cardHolderName: {
        type: String,
        trim: true,
        required: function () { return this.paymentMethod === 'Credit Card'; }
      },
      expiryDate: {
        type: String,
        trim: true,
        validate: {
          validator: function (v) {
            return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(v);
          },
          message: 'Invalid expiry date format (MM/YY)'
        }
      },
      cvv: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 4,
        validate: {
          validator: function (v) {
            return /^[0-9]{3,4}$/.test(v);
          },
          message: 'Invalid CVV'
        }
      }
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: { 
      type: Date 
    }
  },
  { 
    timestamps: true 
  }
);

PaymentSchema.index({ clientId: 1 });
PaymentSchema.index({ insuranceId: 1 });
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ paymentDate: 1 });
PaymentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("Payment", PaymentSchema);
